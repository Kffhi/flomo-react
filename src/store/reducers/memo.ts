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
    name: 'memo',
    initialState,
    reducers: {
        setMemoList(state, action: { payload: memoItemType[] }) {
            state.memoList = action.payload
        },
        updateMemoEditStatus(state, action: { payload: { id: string; isEdit: boolean | undefined } }) {
            state.memoList.forEach(item => {
                if (item.id === action.payload.id) {
                    item.isEdit = action.payload.isEdit
                }
            })
        }
    }
})

export const { setMemoList, updateMemoEditStatus } = memoSlice.actions

export default memoSlice.reducer
