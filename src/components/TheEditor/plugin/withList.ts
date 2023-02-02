import { Editor, Element as SlateElement, Range, Transforms } from 'slate'
import { isBlockActive, LIST_TYPES } from '@/components/TheEditor/plugin/format'

// 数据格式
const mockJSON = [
    {
        type: 'bulleted-list',
        children: [
            { type: 'list-item', children: [{ text: '无序' }] },
            { type: 'list-item', children: [{ text: '无序' }] },
            {
                type: 'numbered-list',
                children: [
                    { type: 'list-item', children: [{ text: '有序' }] },
                    { type: 'list-item', children: [{ text: '有序' }] },
                    {
                        type: 'bulleted-list',
                        children: [
                            { type: 'list-item', children: [{ text: '无序' }] },
                            { type: 'list-item', children: [{ text: '无序' }] }
                        ]
                    },
                    { type: 'list-item', children: [{ text: '有序' }] }
                ]
            },
            { type: 'list-item', children: [{ text: '有序' }] }
        ]
    }
]

// 渲染预期
const expect = `
<ul>
    <li>无序</li>
    <li>无序</li>
    <ol>
        <li>有序</li>
        <li>有序</li>
        <ul>
            <li>无序</li>
            <li>无序</li>
        </ul>
        <li>有序</li>
    </ol>
    <li>有序</li>
</ul>
`

interface newEditor extends Editor {
    handleTab: () => void
}

export const withList = (editor: newEditor) => {
    const { deleteBackward } = editor
    const newEditor = editor

    // 重写deleteBackward，删除或者升级操作，或者变为普通节点
    newEditor.deleteBackward = unit => {
        // 删除行为
        const isListItem = isBlockActive('list-item', editor)
        // 选中了当前 list-item 文本的开头，先转为普通的文本节点
        if (editor?.selection?.focus.offset === 0 && isListItem) {
            Transforms.unwrapNodes(editor, {
                // @ts-ignore
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
                split: true
            })
            const newProperties: any = {
                type: 'paragraph'
            }
            Transforms.setNodes(newEditor, newProperties)
        } else {
            // 否则就调用默认的删除就行
            deleteBackward(unit)
        }
    }

    // 加入handleTab方法，光标在开头时，变为子级
    newEditor.handleTab = () => {
        console.log('handleTab')
    }

    // 数据格式化
    // 似乎用不上，暂不打算对数据结构做调整
    // newEditor.normalizeNode = ([node, path]: any) => {
    //     // TODO: 暂定
    //     // 默认行为
    //     return normalizeNode([node, path])
    // }

    return newEditor as any
}
