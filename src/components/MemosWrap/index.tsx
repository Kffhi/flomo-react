import React, { useEffect, MouseEvent } from 'react'
import ClassNames from 'classnames'
import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchMemoList, setMemoList, updateMemoEditStatus } from '@/store/reducers/memo'
import { MEMO_DROPDOWN_MENU } from '@/utils/constants'
import TheEditor from '@/components/TheEditor'
import { memoItemType } from '@/types/memo'

import './style.less'

const handleClickDropNode = (menu: any) => {
    console.log(menu)
}

/**
 * 下拉菜单
 */
const renderDropdownMenu = <Menu onClick={menu => handleClickDropNode(menu)} items={MEMO_DROPDOWN_MENU} />

const MemosWrap: React.FC = () => {
    const dispatch = useAppDispatch()
    const memoList = useAppSelector(state => state.memo.memoList)

    useEffect(() => {
        fetchMemoList().then(data => {
            data.forEach(memo => {
                memo.isEdit = false
            })
            dispatch(setMemoList(data))
        })
    }, [])

    return (
        <div className={ClassNames('memosWrap')}>
            {memoList.map(memo => (
                <div className={ClassNames('memoItemWrap', { readonly: !memo.isEdit })} key={memo.id}>
                    {!memo.isEdit && (
                        <div className={ClassNames('headerWrap')}>
                            <span>{dayjs(memo.createTime).format('YYYY年MM月DD日 HH:mm:ss')}</span>
                            <Dropdown overlay={renderDropdownMenu} placement="bottom">
                                <EllipsisOutlined onClick={e => e.preventDefault()} />
                            </Dropdown>
                        </div>
                    )}
                    <div className={ClassNames('contentWrap')}>
                        <TheEditor initValue={memo.content} memoId={memo.id} readonly={!memo.isEdit} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MemosWrap
