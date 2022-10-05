import { useEffect, useState, useRef } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { useMemoList } from '@/hooks/useMemoList'

export const useSearch = () => {
    const dispatch = useAppDispatch()
    const { refreshMemoList } = useMemoList()
    const [searchText, setSearchText] = useState<string>('')
    const [searchDate, setSearchDate] = useState<string>('')
    const firstUpload = useRef(true)

    // 搜索
    useEffect(() => {
        if (firstUpload.current) {
            firstUpload.current = false
            return
        }
        refreshMemoList('Filter', { word: searchText, date: searchDate }).then()
    }, [searchText, searchDate])

    return { searchText, setSearchText, searchDate, setSearchDate }
}
