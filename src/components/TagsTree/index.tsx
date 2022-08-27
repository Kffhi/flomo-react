import React, { useEffect } from 'react'
import ClassNames from 'classnames'
import { Tree, Dropdown, Menu } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchTagsTree, setTagTree } from '@/store/reducers/tag'
import { dropMenuItemType, TagsNode, TagsTreeType } from '@/types/tags'

import './style.less'

// 点击下拉菜单
const handleClickDropNode = (menu: any) => {
    // TODO: ？？？为什么这里点击会让tree的select失效
    console.log('menu', menu)
}

// 点击树节点
const handleClickTreeNode = (key: any, o: any) => {
    // TODO：？？？为什么点击之后不给我原始的data？
    console.log('key', key, o.node)
}

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
        <div className={ClassNames('tagsNode')}>
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

const TagsTree: React.FC = () => {
    const dispatch = useAppDispatch()
    const tagsTree: TagsTreeType = useAppSelector(state => state.tagsTree.tags)

    useEffect(() => {
        fetchTagsTree().then(data => {
            dispatch(setTagTree(data))
        })
    }, [])

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
