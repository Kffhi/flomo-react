import { configureStore } from '@reduxjs/toolkit'
import baseInfoReduce from '@/store/reducers/baseInfo'

export const store = configureStore({
    reducer: {
        baseInfo: baseInfoReduce
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
