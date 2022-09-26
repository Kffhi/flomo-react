import React, { useEffect, useState } from 'react'
import ClassNames from 'classnames'
import { PicLeftOutlined, RocketOutlined } from '@ant-design/icons'
import { ACTIVE_MENU } from '@/utils/constants'
import { ACTIVE_MENU_TYPE } from '@/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { layoutSymbolT, setLayoutSymbol } from '@/store/reducers/global'
import { useMemoList } from '@/hooks/useMemoList'
import './style.less'

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const [activeMenu, setActiveMenu] = useState<ACTIVE_MENU_TYPE>(ACTIVE_MENU.MEMO)
    const { refreshType, refreshMemoList } = useMemoList()
    const layoutSymbol: layoutSymbolT = useAppSelector(state => state.global.layoutSymbol)

    useEffect(() => {
        // TODO: 有问题，依赖没有更新
        console.log('refreshType', refreshType)
        if (layoutSymbol === 'MemoList') {
            if (refreshType === 'All') {
                setActiveMenu(ACTIVE_MENU.MEMO)
            } else if (refreshType === 'HangOut') {
                setActiveMenu(ACTIVE_MENU.HANG_OUT)
            }
        } else {
            setActiveMenu('')
        }
    }, [refreshType, layoutSymbol])

    const handleClickMenu = async (id: ACTIVE_MENU_TYPE) => {
        dispatch(setLayoutSymbol('MemoList'))
        if (id === 'MEMO') {
            await refreshMemoList('All')
        } else if (id === 'HANG_OUT') {
            await refreshMemoList('HangOut')
        }
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
