import { configureStore } from '@reduxjs/toolkit'
import globalReduce from '@/store/reducers/global'
import baseInfoReduce from '@/store/reducers/baseInfo'
import tagReduce from '@/store/reducers/tag'
import memoReduce from '@/store/reducers/memo'
import editorReduce from '@/store/reducers/editor'

export const store = configureStore({
    reducer: {
        global: globalReduce,
        baseInfo: baseInfoReduce,
        tagsTree: tagReduce,
        memo: memoReduce,
        editor: editorReduce
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
