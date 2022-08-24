/**
 * 响应类型
 */
// import { AxiosResponse } from 'axios'

export interface MyResponseType<T> {
    code: number
    data: T
    message: string
    status: boolean
}
