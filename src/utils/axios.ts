import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse, CancelTokenStatic } from 'axios'
import { isString } from 'lodash'
import { MyResponseType } from '@/types/request'
import { BASE_URL } from '@/utils/constants'

// 增加query参数
export function addParam(url: string, obj: any = {}): string {
    url += '?'
    Object.keys(obj).forEach(key => {
        if (isString(obj[key])) {
            url += `${key}=${obj[key]}&`
        }
    })
    return url
}

export class Request {
    protected instance: AxiosInstance

    protected pending: Array<{
        url: string
        cancel: Function
    }> = []

    protected CancelToken: CancelTokenStatic = axios.CancelToken

    protected axiosRequestConfig: AxiosRequestConfig = {}

    protected successCode: Array<Number> = [200, 201, 204]

    protected baseURL: string = BASE_URL

    constructor() {
        this.requestConfig()
        this.instance = axios.create(this.axiosRequestConfig)
        this.interceptorsRequest()
        this.interceptorsResponse()
    }

    async get<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<MyResponseType<T>> {
        try {
            return await this.instance.get(addParam(url, data), config)
        } catch (err: any) {
            const message = err.message || '请求失败'
            return Promise.reject({
                code: -1,
                message,
                status: false,
                data: null as any
            })
        }
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<MyResponseType<T>> {
        try {
            return await this.instance.post(url, data, config)
        } catch (err: any) {
            const message = err.message || '请求失败'
            return Promise.reject({
                code: -1,
                message,
                status: false,
                data: null as any
            })
        }
    }

    async delete<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<MyResponseType<T>> {
        try {
            return await this.instance.delete(addParam(url, data), config)
        } catch (err: any) {
            const message = err.message || '请求失败'
            return Promise.reject({
                code: -1,
                message,
                status: false,
                data: null as any
            })
        }
    }

    // axios请求配置
    protected requestConfig(): void {
        this.axiosRequestConfig = {
            baseURL: this.baseURL,
            headers: {
                timestamp: String(new Date().getTime()),
                'Content-Type': 'application/json; charset=utf-8'
            },
            // TODO：这里参数转换有什么用吗
            // transformRequest: [obj => qs.stringify(obj)],
            // transformResponse: [
            //     (data: AxiosResponse) => {
            //         return data
            //     }
            // ],
            // paramsSerializer(params: any) {
            //     // return qs.stringify(params, { arrayFormat: 'brackets' })
            // },
            timeout: 30000,
            withCredentials: false,
            responseType: 'json',
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus(status: number) {
                return status >= 200 && status < 500
            }
        }
    }

    // 请求拦截
    protected interceptorsRequest() {
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                this.removePending(config)
                config.cancelToken = new this.CancelToken((c: any) => {
                    this.pending.push({
                        url: `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`,
                        cancel: c
                    })
                })
                return config
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )
    }

    // 响应拦截
    protected interceptorsResponse(): void {
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                this.removePending(response.config)
                if (this.successCode.indexOf(response.status) === -1) {
                    return Promise.reject(new Error(response.data || 'Error'))
                }
                return response.data
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )
    }

    // 取消重复请求
    protected removePending(config: AxiosRequestConfig): void {
        this.pending.map((v, index) => {
            if (v.url === `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`) {
                v.cancel()
                this.pending.splice(index, 1)
                // console.log('请求重复', this.pending)
            }
            return v
        })
    }
}

// 返回完整的服务端路径
export const getBaseUrl = (url: string) => `${BASE_URL}${url}`

export default new Request()
