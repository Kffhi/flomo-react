import React from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSelected, useSlateStatic } from 'slate-react'
import ClassNames from 'classnames'
import { DeleteOutlined } from '@ant-design/icons'

// 图片节点渲染
const Image = (props: any) => {
    const { attributes, children, element } = props
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor as ReactEditor, element)
    const selected = useSelected()
    // const focused = useFocused() // TODO: 为什么一直是true，以及，select图片之后的光标移动怎么处理

    // 图片删除
    const removeImgNode = () => {
        Transforms.removeNodes(editor, { at: path })
    }

    return (
        <div {...attributes}>
            {children}
            <div contentEditable={false} className={ClassNames('imageWrap')}>
                <img src={element.url} className={ClassNames({ selected })} />
                <DeleteOutlined className={ClassNames('deleteIcon', { selected })} onClick={removeImgNode} />
            </div>
        </div>
    )
}

const Element: React.FC = (props: any) => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'image':
            return <Image {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

export default Element
