import React from 'react'
import {
    BorderlessTableOutlined,
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    UnorderedListOutlined,
    OrderedListOutlined,
    FileImageOutlined,
    SendOutlined
} from '@ant-design/icons'
import { Space, Button } from 'antd'
import ToolButton from './ToolButton'

type propsType = {
    handleSubmitSend: any
}

const ToolBar: React.FC<propsType> = props => {
    const { handleSubmitSend } = props
    return (
        <div className="toolbarWrap">
            <Space>
                <ToolButton format="tag" content={<BorderlessTableOutlined />} type="tag" />
                <ToolButton format="bold" content={<BoldOutlined />} type="mark" />
                <ToolButton format="italic" content={<ItalicOutlined />} type="mark" />
                <ToolButton format="underline" content={<UnderlineOutlined />} type="mark" />
                <ToolButton format="bulleted-list" content={<UnorderedListOutlined />} type="block" />
                <ToolButton format="numbered-list" content={<OrderedListOutlined />} type="block" />
                <ToolButton format="image" content={<FileImageOutlined />} type="image" />
            </Space>
            <Button type="primary" onClick={handleSubmitSend} icon={<SendOutlined />} size="small" />
        </div>
    )
}

export default ToolBar
