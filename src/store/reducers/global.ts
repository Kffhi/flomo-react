import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { searchParamT } from '@/store/reducers/memo'

export type layoutSymbolT = 'MemoList' | 'Message' | 'Setting'
export type refreshTypeT = 'All' | 'byTag' | 'Filter' | 'HangOut'

interface stateType {
    layoutSymbol: layoutSymbolT // 全局的状态，控制右侧主面板，主要懒得用router了
    refreshType: refreshTypeT // memo刷新类型，分别对应：全部/通过tag搜索/通过关键字（或其他条件）搜索/随机漫步
    searchParam: searchParamT // 筛选数据
}

const initialState: stateType = {
    layoutSymbol: 'MemoList', // 默认就memo列表
    refreshType: 'All',
    searchParam: {
        needSearch: false, // TODO：数据更新后是否需要自动刷新memo的标志位
        word: '',
        date: dayjs().format('YYYY年MM月DD日')
    }
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLayoutSymbol(state, action: { payload: layoutSymbolT }) {
            state.layoutSymbol = action.payload
        },
        setRefreshType(state, action: { payload: refreshTypeT }) {
            state.refreshType = action.payload
        },
        setSearchParam(state, action: { payload: searchParamT }) {
            Object.assign(state.searchParam, action.payload)
        }
    }
})

export const { setLayoutSymbol, setRefreshType, setSearchParam } = globalSlice.actions

export default globalSlice.reducer
