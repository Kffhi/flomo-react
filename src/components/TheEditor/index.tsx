import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ClassNames from 'classnames'
import { createEditor, Editor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import ElementComponent from './render/Element'
import Leaf from './render/Leaf'
import ToolBar from './render/ToolBar'
import TagSelect from './render/TagSelect'
import useTagSelect from '@/hooks/useTagSelect'

import './style.less'

const TheEditor: React.FC = () => {
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [
                {
                    text: '#标签1 ',
                    tag: true
                },
                {
                    text: ' '
                },
                {
                    text: '#标签2 ',
                    tag: true
                },
                {
                    text: ' '
                },
                {
                    text: '#标签3 ',
                    tag: true
                }
            ]
        },
        {
            type: 'paragraph',
            children: [
                {
                    text: '普通文本'
                },
                {
                    text: '加粗',
                    bold: true
                },
                {
                    text: '普通文本'
                },
                {
                    text: '斜体',
                    italic: true
                }
            ]
        },
        {
            type: 'bulleted-list',
            children: [
                {
                    type: 'list-item',
                    children: [
                        {
                            text: '无'
                        },
                        {
                            text: '序列',
                            bold: true,
                            italic: true
                        },
                        {
                            text: '表'
                        }
                    ]
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text: '列表项'
                        }
                    ]
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text: ''
                        }
                    ]
                }
            ]
        },
        {
            type: 'paragraph',
            children: [
                {
                    text: '普通'
                },
                {
                    text: '#文本内标签',
                    tag: true
                },
                {
                    text: '文本'
                },
                {
                    text: '#一级标签/二级标签/最多三级',
                    tag: true
                }
            ]
        },
        {
            type: 'numbered-list',
            children: [
                {
                    type: 'list-item',
                    children: [
                        {
                            text: '有序列表'
                        }
                    ]
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text: '列表+1111'
                        }
                    ]
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text: '再来'
                        }
                    ]
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text: ''
                        }
                    ]
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text: ''
                        }
                    ]
                }
            ]
        }
    ])
    const editor = useMemo(() => withReact(createEditor()), [])
    const editorRef = useRef<any>(null)

    // 增加键盘事件监听
    const addListener = () => {
        editorRef.current.addEventListener('keydown', (event: any) => {
            if (!event.isComposing) {
                const marks = Editor.marks(editor)
                // @ts-ignore
                const { tag: isTag = false } = marks

                // 如果标签选择menu展示了但是用户直接输入了，那就隐藏
                if (useTagSelect.isShow()) {
                    useTagSelect.setVisibility(false)
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
                    // const tag = { text: '#', tag: true }
                    Editor.addMark(editor, 'tag', true)
                    useTagSelect.setVisibility(true)
                }
            }
        })
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

    useEffect(() => {
        addListener()
    }, [])

    return (
        <div className={ClassNames('theEditorWrap')}>
            <div className={ClassNames('editor')} ref={editorRef}>
                <TagSelect editor={editor} value={value} editorRef={editorRef} />
                <Slate editor={editor} value={value} onChange={value => handleValueChange(value)}>
                    <Editable className="editableWrap" placeholder="撒，来细数你的想法吧！" renderLeaf={renderLeaf} renderElement={renderElement} />
                    <ToolBar handleSubmitSend={handleSubmitSend} />
                </Slate>
            </div>
        </div>
    )
}

export default TheEditor
