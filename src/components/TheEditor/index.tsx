import React, { useCallback, useMemo, useRef, useState, MouseEvent, KeyboardEvent } from 'react'
import ClassNames from 'classnames'
import { createEditor, Editor, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor, useFocused } from 'slate-react'
import ElementComponent from './render/Element'
import Leaf from './render/Leaf'
import ToolBar from './render/ToolBar'
import TagSelect from './render/TagSelect'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updateMemoEditStatus } from '@/store/reducers/memo'

import './style.less'
import { setTagIsShow } from '@/store/reducers/editor'

type propsType = {
    initValue: Descendant[]
    memoId?: string
    readonly?: boolean
}

const TheEditor: React.FC<propsType> = ({ initValue, readonly, memoId }) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(initValue)
    const editor = useMemo(() => withReact(createEditor()), [])
    const editorRef = useRef<any>(null)
    const focused = useFocused()
    const isShowTagSelect = useAppSelector(state => state.editor.isShowTagSelect)

    // 增加键盘事件监听
    const handleMouseDown = (event: KeyboardEvent) => {
        const marks = Editor.marks(editor)
        // @ts-ignore
        const { tag: isTag = false } = marks

        // 如果标签选择menu展示了但是用户直接输入了，那就隐藏
        if (isShowTagSelect) {
            dispatch(setTagIsShow(false))
        }

        // 如果当前节点已经是tag，发现输入空格，那就变回普通节点
        if ((event.key === ' ' || event.key === 'Enter') && isTag) {
            Editor.removeMark(editor, 'tag')
        }

        // 如果输入#，那就自动变成tag
        if (
            (event.key === '#' ||
                // TODO: 为什么中文的 # 号的key是Process啊
                (event.key === 'Process' && event.code === 'Digit3')) &&
            !isTag
        ) {
            Editor.addMark(editor, 'tag', true)
            dispatch(setTagIsShow(true))
        }
    }

    // 渲染文本
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    // 渲染段落
    const renderElement = useCallback(props => {
        return <ElementComponent {...props} />
    }, [])

    // 编辑区内容变化
    const handleValueChange = (value: any) => {
        console.log('Value Change')
        setValue(value)
    }

    // 点击发送
    const handleSubmitSend = () => {
        console.log('当前编辑区内容', value)
    }

    // 双击进入编辑
    const handleDBClick = (event: MouseEvent) => {
        if (readonly) {
            dispatch(updateMemoEditStatus({ id: memoId as string, isEdit: true }))
            ReactEditor.focus(editor)
        }
    }

    return (
        <div className={ClassNames('theEditorWrap', { readonly })}>
            <div className={ClassNames('editor')} ref={editorRef}>
                <TagSelect editor={editor} editorRef={editorRef} />
                <Slate editor={editor} value={value} onChange={value => handleValueChange(value)}>
                    <Editable
                        className={ClassNames('editableWrap')}
                        placeholder="撒，来细数你的想法吧！"
                        renderLeaf={renderLeaf}
                        renderElement={renderElement}
                        readOnly={readonly}
                        onKeyDown={handleMouseDown}
                        onDoubleClick={handleDBClick}
                    />
                    {!readonly && <ToolBar handleSubmitSend={handleSubmitSend} />}
                </Slate>
            </div>
        </div>
    )
}

TheEditor.defaultProps = {
    readonly: false,
    memoId: ''
}

export default TheEditor
