import { Editor, Element as SlateElement, Range, Transforms, Location, Node, NodeEntry, Path } from 'slate'
import { cloneDeep } from 'lodash'
import { isBlockActive, LIST_TYPES } from '@/components/TheEditor/plugin/format'

// 数据格式
const mockJSON = [
    {
        type: 'bulleted-list',
        children: [
            { type: 'list-item', children: [{ text: '第一级01无序' }] },
            { type: 'list-item', children: [{ text: '第一级02无序' }] },
            {
                type: 'numbered-list',
                children: [
                    { type: 'list-item', children: [{ text: '第二级01有序' }] },
                    { type: 'list-item', children: [{ text: '第二级02有序' }] },
                    {
                        type: 'bulleted-list',
                        children: [
                            { type: 'list-item', children: [{ text: '第三级01无序' }] },
                            { type: 'list-item', children: [{ text: '第三级02无序' }] }
                        ]
                    },
                    { type: 'list-item', children: [{ text: '第二级03有序' }] }
                ]
            },
            { type: 'list-item', children: [{ text: '第一级04有序' }] }
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
        const isListItem = isBlockActive('list-item', newEditor)
        // 选中了当前 list-item 文本的开头，先转为普通的文本节点
        if (newEditor?.selection?.focus.offset === 0 && isListItem) {
            Transforms.unwrapNodes(newEditor, {
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

    /**
     * 加入handleTab方法，如果在list-item内按下Tab，且符合条件，变为子级
     * 不确定flomo是怎么实现的多级列表，看起来交互做的比较好，如果是像wangEditor（猜测语雀也是类似的实现），通过增加level字段，数据结构会比较合理操作也简单些，但是用户交互我不喜欢，放弃...
     * TODO：用一些比较hack的方案实现一下大概的功能：
     * 1.拿到当前的node
     * 2.拿到这个node的兄弟节点
     * 3.拿到这个node的children节点
     * 4.如果这个node的前一个节点是list-item
     * 5.那就把这个node以及其所有的子节点塞到它前一个兄弟节点的children里
     */
    newEditor.handleTab = () => {
        console.log('handleTab')
        const isListItem = isBlockActive('list-item', newEditor)
        // TODO: 这里就不考虑选区的处理了。中间带多个list-item、带了图片之类的
        // 加上选中开头的限制主要是为了好处理光标...
        if (isListItem && newEditor?.selection?.focus.offset === 0) {
            // type Location = Path | Point | Range
            const selectionRange: Range = newEditor.selection as Range // 当前选中位置
            const nodes = Array.from(Editor.nodes<Node>(newEditor, { at: selectionRange })) // 获取所有的node
            // 使用一些奇技淫巧
            const l = nodes.length
            // 倒数第三个是当前node的父节点，type是"bulleted-list"或者"number-list"
            const pNode: NodeEntry<Node> = nodes[l - 3]
            console.log('pNode', pNode)
            // 倒数第二个是当前的list-item节点，（l-1对应的是list-item的children，不需要特殊处理）
            const curNode: NodeEntry<Node> = nodes[l - 2]
            console.log('curNode', curNode)
            // 当前节点的兄弟节点们
            const brotherNodes = Array.from(Node.children(newEditor, pNode[1]))
            console.log('brotherNode', brotherNodes)
            // 相对于根Editor的Path如果相同，说明是同一个节点，这会才可以开始开始提到的判断
            // 先拿到当前节点在兄弟节点中的排行
            const curIndex = brotherNodes.findIndex(i => Path.equals(curNode[1], i[1]))
            // 不是第一个兄弟节点（换句话说，能在按下Tab键之后变成子级节点，那同级前面一定要有一个list-item用来承接）
            // 处理逻辑参考最下方"在兄弟2处按下Tab之后的数据结构变化"
            if (curIndex > 0) {
                const prevBrotherNode = brotherNodes[curIndex - 1]
                const listType = (pNode[0] as any).type ?? 'bulleted-list'

                // TODO: 剩余问题
                // 1.并不是简单粗暴的创建一个子节点塞进去就完事了，因为同级的list-item需要合并在同一个bulleted-list/numbered-list下。考虑是不是直接重新normalizeNode一下更好
                // 2.被选中节点的子节点也需要同步处理，curNode里也是没有更深的子级的，因为数据结构上其实是有一个bulleted-list/numbered-list和当前的list-item同级...
                // 3.deleteBackward需要处理多级列表的情况
                // 4.鼠标光标问题
                // 5.中文输入法已输入未选词状态下使用回车键有问题

                const newProperties: any = {
                    type: listType,
                    children: [cloneDeep(curNode[0])]
                }
                console.log('newProperties', newProperties)
                Transforms.removeNodes(newEditor, { at: curNode[1] })
                Transforms.insertNodes(newEditor, cloneDeep(newProperties), { at: curNode[1] })
                Transforms.move(newEditor)
            }
        }
    }

    // 数据格式化
    // 似乎用不上，暂不打算对数据结构做调整
    // newEditor.normalizeNode = ([node, path]: any) => {
    //     // 默认行为
    //     return normalizeNode([node, path])
    // }

    return newEditor as any
}

// // 在兄弟2处按下Tab之后的数据结构变化
// const _old = [
//     {
//         type: 'bulleted-list',
//         children: [
//             { type: 'list-item', children: [{ text: '第一级01无序' }] },
//             { type: 'list-item', children: [{ text: '第一级02无序' }] }
//         ]
//     }
// ]
// // =>
// const _new = [
//     {
//         type: 'bulleted-list',
//         children: [
//             { type: 'list-item', children: [{ text: '第一级01无序' }] },
//             {
//                 type: 'bulleted-list',
//                 children: [{ type: 'list-item', children: [{ text: '第二级01有序' }] }]
//             }
//         ]
//     }
// ]
