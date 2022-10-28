import React, { ReactElement, useState } from 'react'
import ClassNames from 'classnames'
import { Editor, Element as SlateElement, Transforms } from 'slate'
import { useSlateStatic } from 'slate-react'
import { message, Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps, UploadChangeParam } from 'antd/es/upload/interface'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTagIsShow } from '@/store/reducers/editor'
import { insertImage } from '@/components/TheEditor/plugin/withImages'
import { getBaseUrl } from '@/utils/axios'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

type BtnType = {
    content: ReactElement
    format: string
    type: string
}

const ToolButton: React.FC<BtnType> = ({ content, format, type = 'mark' }) => {
    const editor = useSlateStatic()
    const dispatch = useAppDispatch()

    // upload的属性配置
    const imgProps: UploadProps = {
        accept: '.png, .jpg, .jpeg',
        name: 'files',
        action: getBaseUrl('/memo/upload'),
        showUploadList: false,
        beforeUpload: file => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                message.error('只能选择png/jpg图片').then()
                return false
            }
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                message.error('最大只支持5M的文件').then()
                return false
            }
            return true
        },
        onChange: (info: UploadChangeParam) => {
            const {
                file: { status, response }
            } = info

            if (status === 'done') {
                const url = getBaseUrl(response?.data?.url)
                insertImage(editor, url)
            }
        }
    }

    // 判断文本属性是否为真
    const isMarkActive = (format: any, editor: any) => {
        const marks = Editor.marks(editor)
        // @ts-ignore
        return marks ? marks[format] === true : false
    }

    // 根据文本样式切换属性值
    const toggleMark = (event: any, editor: any, format: any) => {
        event.preventDefault()
        const isActive = isMarkActive(format, editor)

        if (isActive) {
            Editor.removeMark(editor, format)
        } else {
            Editor.addMark(editor, format, true)
        }
        // Transforms.setNodes(editor, { [format]: !isActive }, { match: n => Text.isText(n), split: true })
    }

    // 判断段落属性是否为真
    const isBlockActive = (format: any, editor: any, blockType = 'type') => {
        const { selection } = editor
        if (!selection) return false

        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                // @ts-ignore
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format
            })
        )
        return !!match
    }

    // 根据段落样式切换属性值
    const toggleBlock = (event: any, editor: any, format: any) => {
        event.preventDefault()
        const isActive = isBlockActive(format, editor, 'type') // 默认左对齐，不做居中
        const isList = LIST_TYPES.includes(format)

        Transforms.unwrapNodes(editor, {
            // @ts-ignore
            match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
            split: true
        })

        const newProperties = {
            // eslint-disable-next-line no-nested-ternary
            type: isActive ? 'paragraph' : isList ? 'list-item' : format
        }
        // @ts-ignore
        Transforms.setNodes(editor, newProperties)

        if (!isActive && isList) {
            const block = { type: format, children: [] }
            Transforms.wrapNodes(editor, block)
        }
    }

    // 点击tag
    const toggleTag = (event: any, editor: any, format: any) => {
        event.preventDefault()
        const tag = { text: '#', tag: true }
        editor.insertNode(tag)
        dispatch(setTagIsShow(true))
    }

    // 点击加入图片
    const toggleImg = (event: any) => {
        event.preventDefault()
        // const URL = 'https://www.kffhi.com/public/images/end/logo.jpg'
    }

    if (type === 'mark') {
        return (
            <span
                className={ClassNames('toolItem', { active: isMarkActive(format, editor) })}
                onMouseDown={event => {
                    toggleMark(event, editor, format)
                }}
            >
                {content}
            </span>
        )
    }
    if (type === 'block') {
        return (
            <span
                className={ClassNames('toolItem', { active: isBlockActive(format, editor) })}
                onMouseDown={event => {
                    toggleBlock(event, editor, format)
                }}
            >
                {content}
            </span>
        )
    }
    if (type === 'tag') {
        return (
            <span
                className={ClassNames('toolItem', 'tagBtn')}
                onMouseDown={event => {
                    toggleTag(event, editor, format)
                }}
            >
                {content}
            </span>
        )
    }
    if (type === 'image') {
        return (
            <Upload {...imgProps}>
                <span
                    className={ClassNames('toolItem', { active: isBlockActive(format, editor) })}
                    onMouseDown={event => {
                        toggleImg(event)
                    }}
                >
                    {content}
                </span>
            </Upload>
        )
    }
    return <span>none</span>
}

export default ToolButton
