import React, { useEffect } from 'react'
import ClassNames from 'classnames'
import SearchHeader from '@/components/SearchHeader'
import HeaderEditor from '@/components/HeaderEditor'
import MemosWrap from '@/components/MemosWrap'
import UserHeader from '@/components/UserHeader'
import TheStat from '@/components/TheStat'
import SliderBarUl from '@/components/SliderBarUl'
import TagsTree from '@/components/TagsTree'
import { useRefresh } from '@/utils/useRefresh'

import './style.less'

const App: React.FC = () => {
    const refresh = useRefresh()

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
                    <SearchHeader />
                    <HeaderEditor />
                    <MemosWrap />
                </div>
            </div>
        </div>
    )
}

export default App
