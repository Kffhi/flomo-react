import React, { useEffect } from 'react'
import ClassNames from 'classnames'
import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchMemoList, setMemoList } from '@/store/reducers/memo'
import { MEMO_DROPDOWN_MENU } from '@/utils/constants'

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
            dispatch(setMemoList(data))
        })
    }, [])

    return (
        <div className={ClassNames('memosWrap')}>
            {memoList.map(memo => (
                <div className={ClassNames('memoItemWrap')} key={memo.id}>
                    <div className={ClassNames('headerWrap')}>
                        <span>{dayjs(memo.createTime).format('YYYY年MM月DD日 HH:mm:ss')}</span>
                        <Dropdown overlay={renderDropdownMenu} placement="bottom">
                            <EllipsisOutlined onClick={e => e.preventDefault()} />
                        </Dropdown>
                    </div>
                    <div className={ClassNames('contentWrap')}>编辑器啊编辑器，是不是直接存DOM String好一点</div>
                </div>
            ))}
        </div>
    )
}

export default MemosWrap
