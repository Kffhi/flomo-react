import React, { useCallback, useMemo, useRef, useState, useImperativeHandle, MouseEvent, KeyboardEvent } from 'react'
import ClassNames from 'classnames'
import { createEditor, Editor, Descendant, Transforms } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'
import { isString } from 'lodash'
import ElementComponent from './render/Element'
import Leaf from './render/Leaf'
import ToolBar from './render/ToolBar'
import TagSelect from './render/TagSelect'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updateMemoEditStatus } from '@/store/reducers/memo'
import { initEditorValue } from '@/utils/constants'
import { setTagIsShow } from '@/store/reducers/editor'
import { getCurNodeText, getLastStr, isBlockActive, LIST_TYPES, setListBlock, toggleBlock, toggleMark } from '@/components/TheEditor/plugin/format'
import './style.less'
import { withImages } from '@/components/TheEditor/plugin/withImages'
import { withList } from '@/components/TheEditor/plugin/withList'

type propsType = {
    initValue: Descendant[]
    handleSubmit: (content: Descendant[], memoId: string) => void
    memoId?: string
    readonly?: boolean
    onRef?: any
}

const TheEditor: React.FC<propsType> = ({ initValue, readonly, memoId, handleSubmit, onRef }) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(initValue)
    const editor = useMemo(() => withList(withImages(withHistory(withReact(createEditor())))), [])
    const editorRef = useRef<any>(null)
    const tagSelectRef = useRef<any>(null)
    const isShowTagSelect = useAppSelector(state => state.editor.isShowTagSelect)
    // TODO: 用于解决tag接一个tag的问题
    let needListenTagMark = true

    // 增加键盘事件监听
    const handleKeyDown = (event: KeyboardEvent) => {
        event.stopPropagation()
        // TODO: 功能基本完成之后代码需要整理

        /// /////////// · 标签相关逻辑 start · ////////////

        type marksT = {
            [propName: string]: boolean
        } | null
        const marks = Editor.marks(editor) as marksT // TODO： 实际上这里的类型应该是Omit<Text, 'text'>才对？可是Text里也没我定义的这些format的标识才对，正确应该怎么定义？
        const isTag = marks?.tag ?? false

        // 如果当前标签选择框展示出来了，需要监听上下箭头（切换选中，默认选择第一个）或者回车（确认选中）
        if (isShowTagSelect) {
            // 输入上下箭头切换备选的tag
            // 输入回车确认选中tag
            const isArrow = event.key === 'ArrowDown' || event.key === 'ArrowUp'
            if (isArrow || event.key === 'Enter') {
                // 阻止默认的输入
                event.preventDefault()
                // 调用tag选择
                tagSelectRef?.current?.handleSelectTagKeyUp(event)
            } else {
                // 不是按箭头且用户有输入，那就隐藏
                // 回车的隐藏写在TagSelect里
                dispatch(setTagIsShow(false))
            }
        }

        // 如果当前节点已经是tag，且用户输入了回车，那就变回普通节点
        if (event.key === 'Enter' && isTag) {
            event.preventDefault()
            Editor.removeMark(editor, 'tag')
        }

        // TODO：同上，如果此时已经是tag，但是用户输入了空格，那么也应该变回普通节点
        // 但是又不能简单的监听空格，因为中文输入法空格是选字...
        // 所以这部分逻辑放在了valueChange部分，根据新增的字符是不是' '且当前是否在tag中，来判断是否需要移除tag的mark

        // 如果输入#，，且不是标签节点，那就自动变成tag
        if (
            (event.key === '#' ||
                // TODO: 为什么中文的 # 号的key是Process啊
                (event.key === 'Process' && event.code === 'Digit3')) &&
            !isTag
        ) {
            needListenTagMark = false
            Editor.addMark(editor, 'tag', true)
            dispatch(setTagIsShow(true))
        } else {
            needListenTagMark = true
        }

        /// /////////// · 标签相关逻辑 end · ////////////

        // 加粗
        if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
            event.preventDefault()
            toggleMark(event, editor, 'bold')
        }

        // 斜体
        if ((event.metaKey || event.ctrlKey) && event.key === 'i') {
            event.preventDefault()
            toggleMark(event, editor, 'italic')
        }

        // 下划线
        if ((event.metaKey || event.ctrlKey) && event.key === 'u') {
            event.preventDefault()
            toggleMark(event, editor, 'underline')
        }

        // 如果前面的字符是'*'或者'1'，按下空格会进入列表状态，仿照markdown的预览状态
        const lastStr = getLastStr(editor)
        // 无序列表
        if (lastStr === '*' && event.key === ' ') {
            // 进入无序列表
            event.preventDefault()
            // 删掉当前的'*'
            Editor.deleteBackward(editor, { unit: 'character' })
            setListBlock(editor, 'bulleted-list')
        }

        // 有序列表
        if (lastStr === '1' && event.key === ' ') {
            // 进入有序列表
            event.preventDefault()
            // 删掉当前的'1'
            Editor.deleteBackward(editor, { unit: 'character' })
            setListBlock(editor, 'numbered-list')
        }

        // 当前已经在有序/无序列表中，如果正在新的一个item的起始处，再按一下Enter，那么不添加一个新的list-item而是转换为普通文本
        LIST_TYPES.forEach(item => {
            const isActiveBlock = isBlockActive(item, editor, 'type')
            if (isActiveBlock && event.key === 'Enter') {
                const curNodeText = getCurNodeText(editor)
                if (isString(curNodeText) && curNodeText === '') {
                    event.preventDefault()
                    toggleBlock(event, editor, item)
                }
            }
        })

        // TODO: Tab操作
        if (event.key === 'Tab') {
            event.preventDefault()
            console.log('Tab')
            editor?.handleTab()
        }

        // 撤销
        if ((event.metaKey || event.ctrlKey) && !event.shiftKey && event.key === 'z') {
            event.preventDefault()
            console.log('撤销')
            editor?.undo()
        }
        // 恢复
        if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'z') {
            event.preventDefault()
            console.log('恢复')
            editor?.redo()
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

        // TODO：先这样吧...暂时不知道优雅的写法是啥
        // 如果当前光标的前一个位置的文本内容是空格，且当前在tag中，需要自动退出标签状态
        const lastStr = getLastStr(editor)
        // 如果已经是空格且在标签中，那就退回为普通文本
        // @ts-ignore
        const isTag = Editor.marks(editor).tag
        if (lastStr === ' ' && isTag && needListenTagMark) {
            // TODO: 但是这里有一个问题，当前面是空格，此时我按下#号，触发的顺序是先在上面onKeyDown里触发，标记为tag，触发value change，这里拿到的lastStr是空格。这就导致刚标记的tag又被remove了，这里应该拿用户输入的值才对，所以这里暂时用了一个needListenTagMark值临时解决一下
            Editor.removeMark(editor, 'tag')
        }

        /**
         * TODO:
         * 预期是实现：文本内容变化的时候，能识别出不是标签的内容去掉mark标识（例如前面的#被删了的时候，自动把当前node变成普通的文本节点）
         * （如果还要加上是标签的内容自动加上tag的mark那会更麻烦）
         * 但是如果是监听内容变化的话，似乎需要每一次都要去遍历所有的节点做检查，然后根据不同node的状态修改node的mark
         * 开销可能会比较大，代码也很复杂
         * 是否在编辑的时候不展示标签的样式，只在只读的状态展示标签样式，类似flomo的编辑器
         * 这样的话就是在保存之前对数据做一次统一的检查调整就好
         * add：
         * 暂时决定还是在编辑的时候也展示标签样式，这样虽然在删除的时候肯定是有问题的但是毕竟保存的时候又统一处理，反而能看出来除了删除之外是否有别的地方也出问题了
         */

        // 设置值
        setValue(value)
    }

    // 点击发送
    const handleSubmitSend = () => {
        // 简单的判断一下内容不为空
        // if (JSON.stringify(value) !== JSON.stringify(initEditorValue)) {
        //     handleSubmit(value, memoId ?? '')
        // }
        console.log(value)
    }

    // 清除内容
    const clearEditor = () => {
        // 编辑器状态复原
        Transforms.select(editor, []) // 获取所有内容
        editor.deleteFragment() // 删除选中
        setValue(initEditorValue) // 重置内容
    }

    // 双击进入编辑
    const handleDBClick = (event: MouseEvent) => {
        if (readonly) {
            dispatch(updateMemoEditStatus({ id: memoId as string, isEdit: true }))
            ReactEditor.focus(editor)
        }
    }

    useImperativeHandle(onRef, () => {
        return {
            clearEditor
        }
    })

    return (
        <div className={ClassNames('theEditorWrap', { readonly })}>
            <div className={ClassNames('editor')} ref={editorRef}>
                <Slate editor={editor} value={value} onChange={value => handleValueChange(value)}>
                    <Editable
                        className={ClassNames('editableWrap')}
                        placeholder="撒，来细数你的想法吧！"
                        renderLeaf={renderLeaf}
                        renderElement={renderElement}
                        readOnly={readonly}
                        onKeyDown={handleKeyDown}
                        onDoubleClick={handleDBClick}
                    />
                    {!readonly && <ToolBar handleSubmitSend={handleSubmitSend} />}
                </Slate>
                <TagSelect editor={editor} onRef={tagSelectRef} editorRef={editorRef} />
            </div>
        </div>
    )
}

TheEditor.defaultProps = {
    readonly: false,
    memoId: '',
    onRef: null
}

export default TheEditor
