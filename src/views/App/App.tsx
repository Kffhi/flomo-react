import React from 'react'
import ClassNames from 'classnames'
import SearchHeader from '@/components/SearchHeader'
import EditorWrap from '@/components/EditorWrap'
import MemosWrap from '@/components/MemosWrap'
import UserHeader from '@/components/UserHeader'
import TheStat from '@/components/TheStat'
import SliderBarUl from '@/components/SliderBarUl'

import './style.less'

const App: React.FC = () => {
    return (
        <div className={ClassNames('theLayout')}>
            <div className={ClassNames('main')}>
                <div className={ClassNames('sliderWrap')}>
                    <UserHeader />
                    <TheStat />
                    <SliderBarUl />
                </div>
                <div className={ClassNames('mainWrap')}>
                    <SearchHeader />
                    <EditorWrap />
                    <MemosWrap />
                </div>
            </div>
        </div>
    )
}

export default App
