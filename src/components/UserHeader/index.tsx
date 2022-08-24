import React from 'react'
import ClassNames from 'classnames'
import { SettingOutlined, BellOutlined } from '@ant-design/icons'

import './style.less'

const UserHeader: React.FC = () => {
    return (
        <div className={ClassNames('userHeader')}>
            <div className={ClassNames('left')}>Kffhi</div>
            <div className={ClassNames('iconWrap')}>
                <BellOutlined className={ClassNames('iconStyle')} />
                <SettingOutlined className={ClassNames('iconStyle')} />
            </div>
        </div>
    )
}

export default UserHeader
