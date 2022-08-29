import React from 'react'
import ClassNames from 'classnames'

const Leaf: React.FC = (props: any) => {
    let { children } = props
    const { leaf, attributes } = props

    if (leaf.bold) {
        children = <strong>{children}</strong>
    }
    if (leaf.italic) {
        children = <i>{children}</i>
    }
    if (leaf.underline) {
        children = <u>{children}</u>
    }
    if (leaf.tag) {
        children = <span className={ClassNames('tagNodeWrap')}>{children}</span>
    }
    return <span {...attributes}>{children}</span>
}

export default Leaf
