import React from 'react'
import ClassNames from 'classnames'
import { useReadOnly } from 'slate-react'

const Leaf: React.FC = (props: any) => {
    const readonly = useReadOnly()

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
        children = <span className={ClassNames('tagNodeWrap', { isReadonly: readonly })}>{children}</span>
    }
    return <span {...attributes}>{children}</span>
}

export default Leaf
