import { createSlice } from '@reduxjs/toolkit'
import { memoItemType } from '@/types/memo'
import { MyResponseType } from '@/types/request'
import request from '@/utils/axios'

interface stateType {
    memoList: memoItemType[]
}

const initialState: stateType = {
    memoList: []
}

/**
 * 请求标签树
 */
export const fetchMemoList = async () => {
    const res: MyResponseType<memoItemType[]> = await request.get<memoItemType[]>('/memo/getAll')
    return res.data
}

const memoSlice = createSlice({
    name: 'baseInfo',
    initialState,
    reducers: {
        setMemoList(state, action: { payload: memoItemType[] }) {
            state.memoList = action.payload
        }
    }
})

export const { setMemoList } = memoSlice.actions

export default memoSlice.reducer
