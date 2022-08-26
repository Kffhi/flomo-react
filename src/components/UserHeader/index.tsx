import React, { useEffect } from 'react'
import ClassNames from 'classnames'
import { SettingOutlined, BellOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchUserInfo, setUserInfo } from '@/store/reducers/baseInfo'
import { userInfoType } from '@/types/baseInfo'

import './style.less'

const UserHeader: React.FC = () => {
    const dispatch = useAppDispatch()
    const userInfo: userInfoType = useAppSelector(state => state.baseInfo.userInfo)

    useEffect(() => {
        fetchUserInfo().then(data => {
            dispatch(setUserInfo(data))
        })
    }, [])

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
