import React, { ReactElement, useState } from 'react'
import ClassNames from 'classnames'
import { useSlate } from 'slate-react'
import { Editor } from 'slate'
import { useAppDispatch } from '@/store/hooks'
import { setTagIsShow } from '@/store/reducers/editor'
import ImageBtn from '@/components/TheEditor/render/ImageBtn'
import { isMarkActive, isBlockActive, toggleMark, toggleBlock } from '@/components/TheEditor/plugin/format'

export type BtnType = {
    content: ReactElement
    format: string
    type: string
}

const ToolButton: React.FC<BtnType> = ({ content, format, type = 'mark' }) => {
    const editor = useSlate()
    const dispatch = useAppDispatch()

    // 点击tag
    const toggleTag = (event: any, editor: Editor, format: string) => {
        event.preventDefault()
        const tag = { text: '#', tag: true }
        editor.insertNode(tag)
        dispatch(setTagIsShow(true))
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
        return <ImageBtn content={content} format={format} type={type} />
    }
    return <span>none</span>
}

export default ToolButton
