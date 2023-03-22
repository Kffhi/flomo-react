import React, { useEffect } from 'react'
import ClassNames from 'classnames'
import { text } from 'stream/consumers'
import SearchHeader from '@/components/SearchHeader'
import HeaderEditor from '@/components/HeaderEditor'
import MemosWrap from '@/components/MemosWrap'
import UserHeader from '@/components/UserHeader'
import TheStat from '@/components/TheStat'
import SliderBarUl from '@/components/SliderBarUl'
import TagsTree from '@/components/TagsTree'
import { useRefresh } from '@/hooks/useRefresh'

import './style.less'
import { useAppSelector } from '@/store/hooks'
import { layoutSymbolT } from '@/store/reducers/global'

const App: React.FC = () => {
    const refresh = useRefresh()
    const layoutSymbol: layoutSymbolT = useAppSelector(state => state.global.layoutSymbol)

    useEffect(() => {
        refresh().then()
    }, [])

    return (
        <div className={ClassNames('theLayout')}>
            <div className={ClassNames('main')}>
                <div className={ClassNames('sliderWrap')}>
                    <UserHeader />
                    <TheStat />
                    <SliderBarUl />
                    <TagsTree />
                </div>
                <div className={ClassNames('mainWrap')}>
                    {layoutSymbol === 'MemoList' && (
                        <>
                            <SearchHeader />
                            <HeaderEditor />
                            <MemosWrap />
                        </>
                    )}
                    {layoutSymbol === 'Message' && (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <h1>还没写好捏🐶</h1>
                            <h3>项目地址，欢迎PR：https://github.com/Kffhi/flomo-react</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
