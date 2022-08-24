export type ACTIVE_MENU_TYPE = 'MEMO' | 'HANG_OUT' | ''

export type MENU_TYPE = {
    [propName: string]: ACTIVE_MENU_TYPE
}
