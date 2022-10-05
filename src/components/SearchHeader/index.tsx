import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import ClassNames from 'classnames'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './style.less'
import { useSearch } from '@/hooks/useSearch'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSearchParam } from '@/store/reducers/global'
import { searchParamT } from '@/store/reducers/memo'

const SearchHeader: React.FC = () => {
    const dispatch = useAppDispatch()
    const { submitSearch } = useSearch()
    const ref = useRef(null)
    const searchParam: searchParamT = useAppSelector(state => state.global.searchParam)

    // 搜索
    const handleChangeSearch = (e: SyntheticEvent) => {
        const value = (e.target as HTMLInputElement).value
        dispatch(setSearchParam({ word: value, needSearch: true }))
        // submitSearch(searchParam)
    }

    useEffect(() => {
        if (searchParam.needSearch) {
            submitSearch(searchParam)
        }
    }, [searchParam.word])

    return (
        <div className={ClassNames('searchHeader')}>
            <div className={ClassNames('left')}>MEMO</div>
            <div className={ClassNames('right')}>
                <Input value={searchParam.word} ref={ref} onChange={handleChangeSearch} prefix={<SearchOutlined />} />
            </div>
        </div>
    )
}

export default SearchHeader
