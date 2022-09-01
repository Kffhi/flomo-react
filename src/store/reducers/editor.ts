import { createSlice } from '@reduxjs/toolkit'

interface stateType {
    isShowTagSelect: boolean
}

const initialState: stateType = {
    isShowTagSelect: false
}

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setTagIsShow(state, action: { payload: boolean }) {
            state.isShowTagSelect = action.payload
        }
    }
})

export const { setTagIsShow } = editorSlice.actions

export default editorSlice.reducer
