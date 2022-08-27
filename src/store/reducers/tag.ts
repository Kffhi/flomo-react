import { createSlice } from '@reduxjs/toolkit'
import { TagsTreeType, currTag } from '@/types/tags'
import { MyResponseType } from '@/types/request'
import request from '@/utils/axios'

interface stateType {
    tags: TagsTreeType
    currTag: currTag
}

const initialState: stateType = {
    tags: [],
    currTag: null
}

/**
 * 请求标签树
 */
export const fetchTagsTree = async () => {
    const res: MyResponseType<TagsTreeType> = await request.get<TagsTreeType>('/tag/getAll')
    return res.data
}

const tagSlice = createSlice({
    name: 'baseInfo',
    initialState,
    reducers: {
        setTagTree(state, action: { payload: TagsTreeType }) {
            state.tags = action.payload
        },
        setCurrTag(state, action: { payload: currTag }) {
            state.currTag = action.payload
        }
    }
})

export const { setTagTree, setCurrTag } = tagSlice.actions

export default tagSlice.reducer
