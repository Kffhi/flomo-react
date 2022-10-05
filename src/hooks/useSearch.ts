import { useMemoList } from '@/hooks/useMemoList'
import { searchParamT } from '@/store/reducers/memo'

export const useSearch = () => {
    const { refreshMemoList } = useMemoList()

    const submitSearch = (searchParams: searchParamT) => {
        refreshMemoList('Filter', searchParams).then()
    }

    return { submitSearch }
}
