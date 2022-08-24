import React from 'react'
import ClassNames from 'classnames'
import HeatMap from '@/components/HeatMap'

import './style.less'

const userInfo = {
    memoNumber: 81,
    tagNumber: 24,
    duration: 365
}

const TheStat: React.FC = () => {
    return (
        <div className={ClassNames('theStat')}>
            <div className={ClassNames('dataShow')}>
                <div className={ClassNames('dataItem')}>
                    <div className={ClassNames('value')}>{userInfo.memoNumber}</div>
                    <div className={ClassNames('key')}>MEMO</div>
                </div>
                <div className={ClassNames('dataItem')}>
                    <div className={ClassNames('value')}>{userInfo.tagNumber}</div>
                    <div className={ClassNames('key')}>TAG</div>
                </div>
                <div className={ClassNames('dataItem')}>
                    <div className={ClassNames('value')}>{userInfo.duration}</div>
                    <div className={ClassNames('key')}>DAY</div>
                </div>
            </div>
            <div className={ClassNames('heatMapWrap')}>
                <HeatMap />
            </div>
        </div>
    )
}

export default TheStat
