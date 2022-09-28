import React, { useEffect, useState } from 'react'
import ClassNames from 'classnames'
import { Tree, Dropdown, Menu } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { dropMenuItemType, TagsNode, TagsTreeType } from '@/types/tags'
import { useMemoList } from '@/hooks/useMemoList'
import { layoutSymbolT, refreshTypeT, setLayoutSymbol } from '@/store/reducers/global'

import './style.less'
import { useSearch } from '@/hooks/useSearch'

const menu: dropMenuItemType[] = [
    {
        label: '重命名',
        key: 'rename'
    },
    {
        label: '更改图标',
        key: 'reIcon'
    }
]

const TagsTree: React.FC = () => {
    const dispatch = useAppDispatch()
    const tagsTree: TagsTreeType = useAppSelector(state => state.tagsTree.tags)
    const { refreshMemoList } = useMemoList()
    const [highLightTag, setHighLightTag] = useState<string>('')
    const layoutSymbol: layoutSymbolT = useAppSelector(state => state.global.layoutSymbol)
    const refreshType: refreshTypeT = useAppSelector(state => state.global.refreshType)
    const { setSearchText } = useSearch()

    // 更新当前高亮状态
    useEffect(() => {
        if (layoutSymbol !== 'MemoList' || refreshType !== 'byTag') {
            setHighLightTag('')
        }
    })

    // 点击下拉菜单
    const handleClickDropNode = (menu: any) => {
        // TODO: ？？？为什么这里点击会让tree的select失效
        console.log('menu', menu)
    }

    // 点击树节点
    const handleClickTreeNode = async (key: any, o: any) => {
        const tag = o.node.value
        const tagId = o.node.id
        setHighLightTag(tagId) // 手动设置高亮
        setSearchText('') // 清空搜索
        await refreshMemoList('byTag', { tag, tagId })
    }

    /**
     * 下拉菜单
     */
    const renderDropdownMenu = <Menu onClick={menu => handleClickDropNode(menu)} items={menu} />

    /**
     * 树节点
     * @param node
     */
    const renderTreeNode = (node: TagsNode) => {
        return (
            <div className={ClassNames('tagsNode', { isHighLight: highLightTag === node.id })}>
                <div className={ClassNames('nodeLeft')}>
                    <span className={ClassNames('tagIcon')}>{node.icon}</span>
                    <span>{node.value}</span>
                </div>
                <div className={ClassNames('nodeRight')}>
                    <Dropdown overlay={renderDropdownMenu} placement="bottom">
                        <EllipsisOutlined onClick={e => e.preventDefault()} />
                    </Dropdown>
                </div>
            </div>
        )
    }

    return (
        <div className={ClassNames('tagsTree')}>
            <h3>全部标签</h3>
            <div className={ClassNames('treeWrap')}>
                <Tree treeData={tagsTree} titleRender={renderTreeNode} autoExpandParent onSelect={handleClickTreeNode} />
            </div>
        </div>
    )
}

export default TagsTree
