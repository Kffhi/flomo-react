import React from 'react'
import ClassNames from 'classnames'
import { Button } from 'antd'

import './style.less'

const App: React.FC = () => {
    return (
        <div className={ClassNames('theLayout')}>
            <div className={ClassNames('main')}>
                <div className={ClassNames('sliderWrap')}>
                    <Button type="primary">test</Button>
                </div>
                <div className={ClassNames('mainWrap')}>{222}</div>
            </div>
        </div>
    )
}

export default App
