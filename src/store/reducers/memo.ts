import { createSlice } from '@reduxjs/toolkit'
import { Descendant } from 'slate'
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
 * 请求memo列表
 */
export const fetchMemoList = async () => {
    const res: MyResponseType<memoItemType[]> = await request.get<memoItemType[]>('/memo/getAll')
    return res.data
}

/**
 * 新增memo
 * @param content
 */
export const addMemo = async (content: Descendant[]) => {
    const res: MyResponseType<null | string> = await request.post<null | string>('/memo/add', { content })
    return res.data
}

/**
 * 编辑memo
 * @param id
 * @param content
 */
export const editMemo = async (id: string, content: Descendant[]) => {
    const res: MyResponseType<null | string> = await request.post<null | string>('/memo/edit', { id, content })
    return res.data
}

export const deleteMemo = async (id: string) => {
    const res: MyResponseType<null | string> = await request.delete<null | string>('/memo/delete', { id })
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
