import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import ClassNames from 'classnames'
import { cloneDeep } from 'lodash'
import { Editor } from 'slate'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { TagsNode } from '@/types/tags'
import { setTagIsShow } from '@/store/reducers/editor'

type propsType = {
    editor: Editor
    editorRef: any
    onRef?: any
}

const TagSelect: React.FC<propsType> = props => {
    const { editor, editorRef, onRef } = props
    const ref = useRef<any>(null)
    const dispatch = useAppDispatch()
    const isShowTagSelect = useAppSelector(state => state.editor.isShowTagSelect)
    const tagsArr = useAppSelector(state => state.tagsTree.tagsArr)
    const [showTags, setShowTag] = useState<TagsNode[]>([])
    const [activeTagIndex, setActiveTagIndex] = useState<number>(0)

    useEffect(() => {
        let arr = cloneDeep(tagsArr)
        if (arr.length > 5) {
            // 为了展示效果，默认取前5个
            arr = arr.splice(0, 5)
        }
        // 设置备选
        setShowTag(arr)
        // 恢复默认选中
        setActiveTagIndex(0)
    }, [tagsArr])

    useEffect(() => {
        const el: HTMLDivElement = ref.current

        if (!el) return

        if (!isShowTagSelect) {
            el.removeAttribute('style')
            return
        }

        const domSelection = window.getSelection()
        const domRange = domSelection?.getRangeAt(0)
        const rect = domRange?.getBoundingClientRect() || { top: 0, right: 0 }
        const editorRect = editorRef.current.getBoundingClientRect() || { top: 0, left: 0 }
        // 父容器相对位置-当前光标的相对位置，选择框则基于父容器绝对定位
        // +5px/+7px 只是为了保留一点间距
        el.style.opacity = '1'
        el.style.top = `${rect.top + window.scrollY - editorRect.top + 7}px`
        el.style.left = `${rect.right + window.scrollX - editorRect.left + 5}px`
    }) // 编辑区内容是否有修改

    const handleSelectTag = (data: any) => {
        editor.insertText(`${data.value} `)
        editor.removeMark('tag')
        dispatch(setTagIsShow(false))
    }

    // 键盘事件，监听统一放在外层Editor
    const handleSelectTagKeyUp = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown':
                setActiveTagIndex((activeTagIndex + 1) % 5)
                break
            case 'ArrowUp':
                // +5是为了防止出现负数，5就随便定的魔法数字。因为只提供5个tag做备选
                setActiveTagIndex((activeTagIndex + 5 - 1) % 5)
                break
            case 'Enter':
                handleSelectTag(showTags[activeTagIndex])
                break
            default:
        }
    }

    // 定义对外暴露的方法
    useImperativeHandle(onRef, () => {
        return {
            handleSelectTagKeyUp
        }
    })

    return (
        <div ref={ref} className={ClassNames('tagSelectWrap')} onMouseDown={e => e.preventDefault()}>
            {showTags.map(item => {
                return (
                    <div
                        key={item.id}
                        onClick={() => handleSelectTag({ value: item.value })}
                        className={ClassNames('tagItem', { activeTag: item.value === showTags[activeTagIndex]?.value })}
                    >
                        {item.value}
                    </div>
                )
            })}
        </div>
    )
}

TagSelect.defaultProps = {
    onRef: null
}

export default TagSelect
