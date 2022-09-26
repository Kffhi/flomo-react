import { createSlice } from '@reduxjs/toolkit'

export type layoutSymbolT = 'MemoList' | 'Message' | 'Setting'

interface stateType {
    layoutSymbol: layoutSymbolT // 全局的状态，控制右侧主面板，主要懒得用router了
}

const initialState: stateType = {
    layoutSymbol: 'MemoList' // 默认就memo列表
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLayoutSymbol(state, action: { payload: layoutSymbolT }) {
            state.layoutSymbol = action.payload
        }
    }
})

export const { setLayoutSymbol } = globalSlice.actions

export default globalSlice.reducer
