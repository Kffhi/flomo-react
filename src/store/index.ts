import { configureStore } from '@reduxjs/toolkit'
import baseInfoReduce from '@/store/reducers/baseInfo'
import tagReduce from '@/store/reducers/tag'

export const store = configureStore({
    reducer: {
        baseInfo: baseInfoReduce,
        tagsTree: tagReduce
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
