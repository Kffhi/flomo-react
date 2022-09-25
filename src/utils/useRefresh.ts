// 刷新页面所有的请求数据
import { useAppDispatch } from '@/store/hooks'
import { fetchMemoList, setMemoList } from '@/store/reducers/memo'
import { fetchHeatMap, fetchUserInfo, setHeatMap, setUserInfo } from '@/store/reducers/baseInfo'
import { fetchTagsTree, setTagTree } from '@/store/reducers/tag'

export const useRefresh = () => {
    const dispatch = useAppDispatch()

    const refresh = () => {
        return new Promise((resolve, reject) => {
            // 用户信息
            const p1 = fetchUserInfo().then(data => {
                dispatch(setUserInfo(data))
            })

            // 热力图
            const p2 = fetchHeatMap().then(data => {
                dispatch(setHeatMap(data))
            })

            // 标签树
            const p3 = fetchTagsTree().then(data => {
                dispatch(setTagTree(data))
            })

            // memo列表
            const p4 = fetchMemoList().then(data => {
                data.forEach(memo => {
                    memo.isEdit = false
                })
                dispatch(setMemoList(data))
            })

            Promise.all([p1, p2, p3, p4])
                .then(() => {
                    resolve('')
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    return refresh
}
