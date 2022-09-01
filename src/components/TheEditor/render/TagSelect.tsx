import React, { useEffect, useRef } from 'react'
import ClassNames from 'classnames'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTagIsShow } from '@/store/reducers/editor'

type propsType = {
    editor: any
    editorRef: any
}

const TagSelect: React.FC<propsType> = props => {
    const { editor, editorRef } = props
    const ref = useRef<any>(null)
    const dispatch = useAppDispatch()
    const isShowTagSelect = useAppSelector(state => state.editor.isShowTagSelect)

    useEffect(() => {
        const el: any = ref.current
        // const { selection } = editor

        if (!el) return

        if (!isShowTagSelect) {
            el.removeAttribute('style')
            return
        }

        // if (selection) {
        const domSelection = window.getSelection()
        const domRange = domSelection?.getRangeAt(0)
        const rect = domRange?.getBoundingClientRect() || { top: 0, right: 0 }
        const editorRect = editorRef.current.getBoundingClientRect() || { top: 0, left: 0 }
        // 父容器相对位置-当前光标的相对位置，选择框则基于父容器绝对定位
        // +5px/+7px 只是为了保留一点间距
        el.style.opacity = '1'
        el.style.top = `${rect.top + window.scrollY - editorRect.top + 7}px`
        el.style.left = `${rect.right + window.scrollX - editorRect.left + 5}px`
        // }
    }) // 编辑区内容是否有修改

    const handleSelectTag = (data: any) => {
        editor.insertText(`${data.value} `)
        editor.removeMark('tag')
        dispatch(setTagIsShow(false))
    }

    return (
        <div ref={ref} className={ClassNames('tagSelectWrap')} onMouseDown={e => e.preventDefault()}>
            {['标签1', '标签2', '标签3'].map(item => {
                return (
                    <div key={item} onClick={() => handleSelectTag({ value: item })} className={ClassNames('tagItem')}>
                        {item}
                    </div>
                )
            })}
        </div>
    )
}

export default TagSelect