export interface TagsNode {
    id: string
    pid: string
    value: string
    sortId: number
    icon: string
    children: TagsNode[]
}

export type TagsTreeType = TagsNode[]

export type currTag = TagsNode | null
