import React from 'react'
import ClassNames from 'classnames'
import { message, Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload/interface'
import { useSlateStatic } from 'slate-react'
import { getBaseUrl } from '@/utils/axios'
import { insertImage } from '@/components/TheEditor/plugin/withImages'
import { BtnType } from '@/components/TheEditor/render/ToolButton'

const ImageBtn: React.FC<BtnType> = ({ content, format, type = 'mark' }) => {
    const editor = useSlateStatic()

    // 上传前的验证
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('只能选择png/jpg图片').then()
            return false
        }
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!isLt5M) {
            message.error('最大只支持5M的文件').then()
            return false
        }
        return true
    }

    // 文件修改，其实就是只处理上传成功
    const uploadSuccess = (info: UploadChangeParam) => {
        const {
            file: { status, response }
        } = info

        if (status === 'done') {
            // const url = getBaseUrl(response?.data?.url)
            insertImage(editor, response?.data?.url ?? '')
        }
    }

    const uploadProps: UploadProps = {
        accept: '.png, .jpg, .jpeg',
        name: 'files',
        action: getBaseUrl('/memo/upload'),
        showUploadList: false,
        beforeUpload,
        onChange: uploadSuccess
    }

    return (
        <Upload {...uploadProps}>
            <span className={ClassNames('toolItem')}>{content}</span>
        </Upload>
    )
}

export default ImageBtn
