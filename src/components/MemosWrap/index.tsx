import React from 'react'
import ClassNames from 'classnames'
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Dropdown, Menu, message, Modal, Button } from 'antd'
import dayjs from 'dayjs'
import { Descendant } from 'slate'
import { useAppSelector } from '@/store/hooks'
import { MEMO_DROPDOWN_MENU, TOP_ID } from '@/utils/constants'
import TheEditor from '@/components/TheEditor'
import { deleteMemo, editMemo } from '@/store/reducers/memo'
import { useRefresh } from '@/hooks/useRefresh'
import './style.less'
import { memoItemType } from '@/types/memo'
import { refreshTypeT } from '@/store/reducers/global'
import { useMemoList } from '@/hooks/useMemoList'

const MemosWrap: React.FC = () => {
    const memoList = useAppSelector(state => state.memo.memoList)
    const refresh = useRefresh()
    const { refreshMemoList } = useMemoList()
    const refreshType: refreshTypeT = useAppSelector(state => state.global.refreshType)

    /**
     * 下拉菜单
     */
    const renderDropdownMenu = (memo: memoItemType) => {
        // 删除
        const handle2Delete = () => {
            Modal.confirm({
                title: '删除',
                content: '确认删除?',
                icon: <ExclamationCircleOutlined />,
                okText: '删除',
                cancelText: '取消',
                okType: 'danger',
                // centered: true,
                onOk: () => {
                    deleteMemo(memo.id).then(async () => {
                        await refresh()
                        await message.success('删除成功')
                    })
                },
                onCancel: () => {}
            })
        }

        // 点击下拉菜单
        const handleClickDropNode = (menu: any) => {
            console.log(menu)
            switch (menu.key) {
                case 'delete':
                    handle2Delete()
                    break
                default:
            }
        }
        return <Menu onClick={menu => handleClickDropNode(menu)} items={MEMO_DROPDOWN_MENU} />
    }

    // 编辑
    const handle2Edit = (content: Descendant[], id: string) => {
        console.log('编辑', content, id)
        editMemo(id, content).then(async () => {
            // TODO: 现在刷新数据之后会导致memo列表所有的memo都恢复成未再编辑状态
            await refresh()
            await message.success('编辑成功')
        })
    }

    // 随机漫步刷新
    const handleAnotherHangout = async () => {
        await refreshMemoList('HangOut')
    }

    return (
        <div className={ClassNames('memosWrap')}>
            {memoList.map(memo => (
                <div className={ClassNames('memoItemWrap', { readonly: !memo.isEdit }, { needShowTop: memo.id === TOP_ID })} key={memo.id}>
                    {!memo.isEdit && (
                        <div className={ClassNames('headerWrap')}>
                            <span>{dayjs(memo.createTime).format('YYYY年MM月DD日 HH:mm:ss')}</span>
                            <Dropdown overlay={renderDropdownMenu(memo)} placement="bottom">
                                <EllipsisOutlined onClick={e => e.preventDefault()} />
                            </Dropdown>
                        </div>
                    )}
                    <div className={ClassNames('contentWrap')}>
                        <TheEditor initValue={memo.content} memoId={memo.id} readonly={!memo.isEdit} handleSubmit={handle2Edit} />
                    </div>
                </div>
            ))}
            {/* 随机漫步专用按钮 */}
            {refreshType === 'HangOut' && (
                <div className={ClassNames('anotherBtn')}>
                    <Button shape="round" block onClick={handleAnotherHangout}>
                        another
                    </Button>
                </div>
            )}
        </div>
    )
}

export default MemosWrap
