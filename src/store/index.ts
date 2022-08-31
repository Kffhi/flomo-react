import { configureStore } from '@reduxjs/toolkit'
import baseInfoReduce from '@/store/reducers/baseInfo'
import tagReduce from '@/store/reducers/tag'
import memoReduce from '@/store/reducers/memo'

export const store = configureStore({
    reducer: {
        baseInfo: baseInfoReduce,
        tagsTree: tagReduce,
        memo: memoReduce
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
