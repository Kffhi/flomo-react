// 根据不同需求刷新memo列表
// import { useState } from 'react'
import dayjs from 'dayjs'
import { useAppDispatch } from '@/store/hooks'
import { fetchMemoList, fetchMemoByTag, setMemoList, tagParamT, getMemoHangout, searchMemo, searchParamT } from '@/store/reducers/memo'
import { refreshTypeT, setLayoutSymbol, setRefreshType } from '@/store/reducers/global'

type refreshParamsType = tagParamT | searchParamT

export const useMemoList = () => {
    const dispatch = useAppDispatch()

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
        return fetchMemoByTag(params).then(data => {
            data.forEach(memo => {
                memo.isEdit = false
            })
            dispatch(setMemoList(data))
        })
    }

    // 通过条件获取，暂时就是关键字/日期搜索
    const getMemoListByParams = (param: searchParamT) => {
        const obj = { ...param }
        // TODO：Flomo似乎也没做当前的搜索
        if (obj?.date === dayjs().format('YYYY年MM月DD日')) {
            obj.date = ''
        }
        return searchMemo(obj).then(data => {
            data.forEach(memo => {
                memo.isEdit = false
            })
            dispatch(setMemoList(data))
        })
    }

    // 随机获取一条
    const getMemoListRandom = () => {
        return getMemoHangout().then(data => {
            data.forEach(memo => {
                memo.isEdit = false
            })
            dispatch(setMemoList(data))
        })
    }

    /**
     * 刷新memo列表
     * @param type 类型
     * @param params 不同类型所需的参数
     */
    const refreshMemoList = (type: refreshTypeT, params?: refreshParamsType) => {
        // 更新全局状态
        dispatch(setLayoutSymbol('MemoList'))
        dispatch(setRefreshType(type))
        // 更新数据
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
                    getMemoListByParams(params as searchParamT)
                        .then(() => resolve())
                        .catch(err => reject(err))
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

    return { refreshMemoList }
}
