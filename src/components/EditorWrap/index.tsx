import React from 'react'
import ClassNames from 'classnames'
import MainEditor from '@/components/editor'

import './style.less'

const EditorWrap: React.FC = () => {
    return (
        <div className={ClassNames('theEditorWrap')}>
            <MainEditor />
        </div>
    )
}

export default EditorWrap
