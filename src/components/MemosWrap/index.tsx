import React, { useEffect, MouseEvent } from 'react'
import ClassNames from 'classnames'
import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import dayjs from 'dayjs'
import { Descendant } from 'slate'
import { useAppSelector } from '@/store/hooks'
import { MEMO_DROPDOWN_MENU } from '@/utils/constants'
import TheEditor from '@/components/TheEditor'

import './style.less'

const handleClickDropNode = (menu: any) => {
    console.log(menu)
}

/**
 * 下拉菜单
 */
const renderDropdownMenu = <Menu onClick={menu => handleClickDropNode(menu)} items={MEMO_DROPDOWN_MENU} />

const MemosWrap: React.FC = () => {
    const memoList = useAppSelector(state => state.memo.memoList)

    // 编辑
    const handle2Edit = (content: Descendant[], memoId: string) => {
        console.log('编辑', content, memoId)
    }

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
                        <TheEditor initValue={memo.content} memoId={memo.id} readonly={!memo.isEdit} handleSubmit={handle2Edit} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MemosWrap
