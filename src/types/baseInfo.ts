export interface userInfoType {
    userName: string
    duration: number
    tagNumber: number
    memoNumber: number
    userId?: string
    password?: string
    registerTime?: number
}

export interface dayItemType {
    date: string
    times: number
    isToday?: boolean
}

export type heatMapItemType = [string, dayItemType]

export type heatMapType = heatMapItemType[]

export interface monthItemType {
    value: number
    column: number
}

export type dayMapType = Map<string, dayItemType>
