import React from 'react'
import ClassNames from 'classnames'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import './style.less'

const SearchHeader: React.FC = () => {
    return (
        <div className={ClassNames('searchHeader')}>
            <div className={ClassNames('left')}>MEMO</div>
            <div className={ClassNames('right')}>
                <Input prefix={<SearchOutlined />} />
            </div>
        </div>
    )
}

export default SearchHeader
