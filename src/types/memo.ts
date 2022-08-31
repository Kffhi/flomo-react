import { Descendant } from 'slate'

export type memoItemType = {
    id: string
    content: Descendant[]
    tags: string[]
    files: any[]
    userId: string
    createTime: number
    updateTime: number
    isEdit?: boolean
}
