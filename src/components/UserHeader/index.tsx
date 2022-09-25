import React, { useEffect } from 'react'
import ClassNames from 'classnames'
import { SettingOutlined, BellOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/store/hooks'
import { userInfoType } from '@/types/baseInfo'

import './style.less'

const UserHeader: React.FC = () => {
    const userInfo: userInfoType = useAppSelector(state => state.baseInfo.userInfo)

    return (
        <div className={ClassNames('userHeader')}>
            <div className={ClassNames('left')}>{userInfo.userName}</div>
            <div className={ClassNames('iconWrap')}>
                <BellOutlined className={ClassNames('iconStyle')} />
                <SettingOutlined className={ClassNames('iconStyle')} />
            </div>
        </div>
    )
}

export default UserHeader
