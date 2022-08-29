import React from 'react'

const Element: React.FC = (props: any) => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        default:
            return <p {...attributes}>{children}</p>
    }
}

export default Element
