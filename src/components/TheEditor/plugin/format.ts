import { Editor, Element as SlateElement, Point, Range, Transforms } from 'slate'

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

// 判断文本属性是否为真
export const isMarkActive = (format: string, editor: Editor) => {
    const marks = Editor.marks(editor)
    // @ts-ignore
    return marks ? marks[format] === true : false
}

// 根据文本样式切换属性值
export const toggleMark = (event: any, editor: Editor, format: string) => {
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
export const isBlockActive = (format: string, editor: Editor, blockType = 'type') => {
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
export const toggleBlock = (event: any, editor: Editor, format: string) => {
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

/**
 * 设置为列表项
 * @param editor
 * @param format
 */
export const setListBlock = (editor: Editor, format: string) => {
    Transforms.unwrapNodes(editor, {
        // @ts-ignore
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
        split: true
    })

    const newProperties: any = {
        type: 'list-item'
    }
    Transforms.setNodes(editor, newProperties)
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
}

/**
 * 获取光标的上一个字符
 * @param editor
 */
export const getLastStr = (editor: Editor) => {
    const point = Range.start(editor.selection as Range) // 获取当前光标的点
    const beforePoint = Editor.before(editor, point, { distance: 1 }) as Point // 光标前一个点
    const range = Editor.range(editor, point, beforePoint) // 获取两点中间的范围
    const lastStr = Editor.string(editor, range) // 获取两点中的文字内容
    return lastStr
}

/**
 * 获取光标当前的node的text
 * @param editor
 */
export const getCurNodeText = (editor: Editor) => {
    const point = Range.start(editor.selection as Range) // 获取当前光标的点
    const node: any = Editor.node(editor, point)
    const text = node?.[0]?.text ?? null
    return text
}
