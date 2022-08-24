import React, { useState } from 'react'
import ClassNames from 'classnames'
import { PicLeftOutlined, RocketOutlined } from '@ant-design/icons'
import { ACTIVE_MENU } from '@/utils/constants'
import { ACTIVE_MENU_TYPE } from '@/types'

import './style.less'

const App: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState<ACTIVE_MENU_TYPE>(ACTIVE_MENU.MEMO)

    const handleClickMenu = (id: ACTIVE_MENU_TYPE) => {
        setActiveMenu(id)
    }

    return (
        <ul className={ClassNames('sliderBarUl')}>
            <li className={ClassNames(activeMenu === ACTIVE_MENU.MEMO ? 'selected' : '')} onClick={() => handleClickMenu(ACTIVE_MENU.MEMO)}>
                <PicLeftOutlined className={ClassNames('menuIcon')} />
                Memo
            </li>
            <li className={ClassNames(activeMenu === ACTIVE_MENU.HANG_OUT ? 'selected' : '')} onClick={() => handleClickMenu(ACTIVE_MENU.HANG_OUT)}>
                <RocketOutlined className={ClassNames('menuIcon')} />
                随机漫步
            </li>
        </ul>
    )
}

export default App
