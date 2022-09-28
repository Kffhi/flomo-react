import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import ClassNames from 'classnames'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import './style.less'
import { useSearch } from '@/hooks/useSearch'

const SearchHeader: React.FC = () => {
    const { searchText, setSearchText } = useSearch()
    const ref = useRef(null)

    useEffect(() => {
        // 清空
    }, [searchText])

    // 搜索
    const handleChangeSearch = (e: SyntheticEvent) => {
        const value = (e.target as HTMLInputElement).value
        setSearchText(value)
    }

    return (
        <div className={ClassNames('searchHeader')}>
            <div className={ClassNames('left')}>MEMO</div>
            <div className={ClassNames('right')}>
                <Input value={searchText} ref={ref} onChange={handleChangeSearch} prefix={<SearchOutlined />} />
            </div>
        </div>
    )
}

export default SearchHeader
