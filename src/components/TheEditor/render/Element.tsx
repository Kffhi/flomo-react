import React from 'react'
import { ReactEditor, useFocused, useSelected, useSlateStatic } from 'slate-react'
import ClassNames from 'classnames'

// 图片节点渲染
const Image = (props: any) => {
    const { attributes, children, element } = props
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor as ReactEditor, element)
    const selected = useSelected()
    const focused = useFocused()

    return (
        <div {...attributes}>
            {children}
            <div contentEditable={false} className={ClassNames('imageWrap')}>
                <img src={element.url} className={ClassNames({ selected, focused })} />
            </div>
            {children}
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
