import React, { useEffect } from 'react'
import ClassNames from 'classnames'
import { SettingOutlined, BellOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { userInfoType } from '@/types/baseInfo'
import { setLayoutSymbol } from '@/store/reducers/global'
import './style.less'

const UserHeader: React.FC = () => {
    const dispatch = useAppDispatch()
    const userInfo: userInfoType = useAppSelector(state => state.baseInfo.userInfo)

    const handleShowMessage = () => {
        dispatch(setLayoutSymbol('Message'))
    }

    return (
        <div className={ClassNames('userHeader')}>
            <div className={ClassNames('left')}>{userInfo.userName}</div>
            <div className={ClassNames('iconWrap')}>
                <Badge dot>
                    <BellOutlined onClick={handleShowMessage} className={ClassNames('iconStyle')} />
                </Badge>
                <SettingOutlined className={ClassNames('iconStyle')} />
            </div>
        </div>
    )
}

export default UserHeader
