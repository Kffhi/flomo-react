import { createSlice } from '@reduxjs/toolkit'
import { userInfoType, heatMapType } from '@/types/baseInfo'
import { MyResponseType } from '@/types/request'
import request from '@/utils/axios'

interface stateType {
    userInfo: userInfoType
    heatMap: heatMapType
}

const initialState: stateType = {
    userInfo: {
        userName: '',
        duration: 0,
        tagNumber: 0,
        memoNumber: 0
    },
    heatMap: []
}

/**
 * 请求用户信息
 */
export const fetchUserInfo = async () => {
    const res: MyResponseType<userInfoType> = await request.get<userInfoType>('/state/userInfo')
    return res.data
}

/**
 * 请求热力图信息
 */
export const fetchHeatMap = async () => {
    const res: MyResponseType<any[]> = await request.get<heatMapType>('/state/heatMap')
    return res.data
}

const baseInfoSlice = createSlice({
    name: 'baseInfo',
    initialState,
    reducers: {
        setUserInfo(state, action: { payload: userInfoType }) {
            state.userInfo = action.payload
        },
        setHeatMap(state, action: { payload: any[] }) {
            state.heatMap = action.payload
        }
    }
})

export const { setUserInfo, setHeatMap } = baseInfoSlice.actions

export default baseInfoSlice.reducer
