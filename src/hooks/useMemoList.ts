// 根据不同需求刷新memo列表
import { useState, useReducer } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { fetchMemoList, setMemoList } from '@/store/reducers/memo'

// 刷新类型，分别对应：全部/通过tag搜索/通过关键字（或其他条件）搜索/随机漫步
type refreshTypeT = 'All' | 'byTag' | 'Filter' | 'HangOut'

type tagParamT = {
    tag: string
    tagId: string
}

type refreshParamsType =
    | {
          string?: any
      }
    | tagParamT

export const useMemoList = () => {
    const dispatch = useAppDispatch()

    const [refreshType, setRefreshType] = useState<refreshTypeT>('All')

    // 获取所有
    const getMemoListAll = () => {
        return fetchMemoList().then(data => {
            data.forEach(memo => {
                memo.isEdit = false
            })
            dispatch(setMemoList(data))
        })
    }

    // 通过tag获取
    const getMemoListByTag = (params: tagParamT) => {
        // TODO: 接口还没写呢，先这么着吧
        return fetchMemoList().then(data => {
            data.forEach(memo => {
                memo.isEdit = false
            })
            dispatch(setMemoList(data.splice(0, Math.floor(Math.random() * 10))))
        })
    }

    // 通过条件获取，暂时就是关键字搜索
    const getMemoListByParams = () => {}

    // 随机获取一条
    const getMemoListRandom = () => {
        // TODO: 接口还没写呢，先这么着吧
        return fetchMemoList().then(data => {
            data.forEach(memo => {
                memo.isEdit = false
            })
            dispatch(setMemoList(data.splice(0, Math.floor(Math.random() * 10))))
        })
    }

    const refreshMemoList = (type: refreshTypeT, params?: refreshParamsType) => {
        setRefreshType(type)
        return new Promise<void>((resolve, reject) => {
            switch (type) {
                case 'All':
                    getMemoListAll()
                        .then(() => resolve())
                        .catch(err => reject(err))
                    break
                case 'byTag':
                    getMemoListByTag(params as tagParamT)
                        .then(() => resolve())
                        .catch(err => reject(err))
                    break
                case 'Filter':
                    break
                case 'HangOut':
                    getMemoListRandom()
                        .then(() => resolve())
                        .catch(err => reject(err))
                    break
                default:
                    reject(`类型错误，传入类型为${type}`)
            }
        })
    }

    return { refreshType, refreshMemoList }
}
