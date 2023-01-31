import { Editor } from 'slate'

// 旧的，不支持多级列表的数据格式
const oldJSON = [
    {
        type: 'bulleted-list',
        children: [
            { type: 'list-item', children: [{ text: '无序' }] },
            { type: 'list-item', children: [{ text: '无序' }] }
        ]
    },
    {
        type: 'numbered-list',
        children: [
            { type: 'list-item', children: [{ text: '有序' }] },
            { type: 'list-item', children: [{ text: '有序' }] }
        ]
    }
]

// 渲染预期
const res = `
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
    const { deleteBackward, normalizeNode } = editor
    const newEditor = editor

    // 数据格式化
    newEditor.normalizeNode = ([node, path]: any) => {
        // TODO: 暂定
        // 默认行为
        return normalizeNode([node, path])
    }

    // 重写deleteBackward，删除或者升级操作，或者变为普通节点
    newEditor.deleteBackward = unit => {
        console.log('deleteBackward', unit)

        // 默认行为
        deleteBackward(unit)
    }

    // 加入handleTab方法，光标在开头时，变为子级
    newEditor.handleTab = () => {
        console.log('handleTab')
    }

    return newEditor as any // TODO: 这咋写嘛
}
