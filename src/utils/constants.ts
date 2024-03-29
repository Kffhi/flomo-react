import { MENU_TYPE } from '@/types'
import { dropMenuItemType } from '@/types/tags'

// 后端服务地址
// export const BASE_URL = 'http://localhost:2022'
export const BASE_URL = 'https://www.kffhi.com/flomo-server'

// 左侧菜单列表
export const ACTIVE_MENU: MENU_TYPE = {
    MEMO: 'MEMO',
    HANG_OUT: 'HANG_OUT'
}

// memo的操作菜单
export const MEMO_DROPDOWN_MENU: dropMenuItemType[] = [
    {
        label: '编辑',
        key: 'edit'
    },
    {
        label: '置顶',
        key: 'toTop'
    },
    {
        label: '分享',
        key: 'share'
    },
    {
        label: '查看详情',
        key: 'detail'
    },
    {
        label: '复制链接',
        key: 'copyLink'
    },
    {
        label: '删除',
        key: 'delete'
    }
]

export const initEditorValue = [
    {
        type: 'paragraph',
        children: [
            {
                text: ''
            }
        ]
    }
]

export const TOP_ID = '391a613c-dc90-454b-873f-22a227b178f0'
