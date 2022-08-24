import React from 'react'
import ClassNames from 'classnames'

import './style.less'

const HeatMap: React.FC = () => {
    return (
        <div className="heatMap">
            <div className="dayBox" />
            <div className="monthBox">
                <div className="monthItem">月</div>
            </div>
        </div>
    )
}

export default HeatMap
