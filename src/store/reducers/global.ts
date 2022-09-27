import { createSlice } from '@reduxjs/toolkit'

export type layoutSymbolT = 'MemoList' | 'Message' | 'Setting'
export type refreshTypeT = 'All' | 'byTag' | 'Filter' | 'HangOut'

interface stateType {
    layoutSymbol: layoutSymbolT // 全局的状态，控制右侧主面板，主要懒得用router了
    refreshType: refreshTypeT // memo刷新类型，分别对应：全部/通过tag搜索/通过关键字（或其他条件）搜索/随机漫步
}

const initialState: stateType = {
    layoutSymbol: 'MemoList', // 默认就memo列表
    refreshType: 'All'
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
        }
    }
})

export const { setLayoutSymbol, setRefreshType } = globalSlice.actions

export default globalSlice.reducer
