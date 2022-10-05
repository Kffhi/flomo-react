import { createSlice } from '@reduxjs/toolkit'
import { Descendant } from 'slate'
import { memoItemType } from '@/types/memo'
import { MyResponseType } from '@/types/request'
import request from '@/utils/axios'

export type tagParamT = {
    tag: string
    tagId: string
}

export type searchParamT = {
    word?: string
    date?: string
    needSearch: boolean // 是否需要自动刷新，先这么写吧
}

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
 * 根据标签请求memo列表
 */
export const fetchMemoByTag = async (params: tagParamT) => {
    const res: MyResponseType<memoItemType[]> = await request.get<memoItemType[]>('/memo/getByTag', params)
    return res.data
}

/**
 * 根据标签请求memo列表
 */
export const searchMemo = async (params: searchParamT) => {
    const res: MyResponseType<memoItemType[]> = await request.post<memoItemType[]>('/memo/search', params)
    return res.data
}

/**
 * 随机获取一个memo
 */
export const getMemoHangout = async () => {
    const res: MyResponseType<memoItemType[]> = await request.get<memoItemType[]>('/memo/hangout')
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

/**
 * 删除memo
 * @param id
 */
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
