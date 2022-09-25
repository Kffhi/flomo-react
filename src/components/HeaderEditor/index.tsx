import React, { createRef, useRef } from 'react'
import ClassNames from 'classnames'
import { Descendant } from 'slate'
import { message } from 'antd'
import TheEditor from '@/components/TheEditor'
import { addMemo } from '@/store/reducers/memo'
import './style.less'
import { useRefresh } from '@/utils/useRefresh'
import { initEditorValue } from '@/utils/constants'

const App: React.FC = () => {
    const refresh = useRefresh()
    const editorRef: any = useRef()

    // 新增
    const handle2Add = (content: Descendant[]) => {
        addMemo(content).then(async () => {
            // 刷新页面数据
            await refresh()
            // 清空编辑器
            editorRef?.current?.clearEditor()
            await message.success('新增成功')
        })
    }

    return (
        <div className={ClassNames('HeaderEditor')}>
            <TheEditor onRef={editorRef} initValue={initEditorValue} readonly={false} handleSubmit={handle2Add} />
        </div>
    )
}

export default App
