import React, { useEffect, useState } from 'react'
import ClassNames from 'classnames'
import { Tree, Dropdown, Menu, Button, message } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { dropMenuItemType, TagsNode, TagsTreeType } from '@/types/tags'
import { useMemoList } from '@/hooks/useMemoList'
import { layoutSymbolT, refreshTypeT, setLayoutSymbol, setSearchParam } from '@/store/reducers/global'
import './style.less'

const menu = [
    {
        label: (
            <Button size="small" disabled type="text">
                重命名
            </Button>
        ),
        key: 'rename'
    },
    {
        label: (
            <Button size="small" type="text">
                更改图标
            </Button>
        ),
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

    // 更新当前高亮状态
    useEffect(() => {
        if (layoutSymbol !== 'MemoList' || refreshType !== 'byTag') {
            setHighLightTag('')
        }
    })

    // 点击下拉菜单
    const handleClickDropNode = ({ item, key, keyPath, domEvent }: any, node: TagsNode) => {
        domEvent.stopPropagation()
        // console.log('menu', item)
        // console.log('menu', key)
        // console.log('menu', keyPath)
        // console.log('node', node.value, node.id)
        switch (key) {
            case 'rename':
                break
            case 'reIcon':
                message.warning('暂未开放').then()
                break
            default:
        }
    }

    // 点击树节点
    const handleClickTreeNode = async (key: any, o: any) => {
        const tag = o.node.value
        const tagId = o.node.id
        setHighLightTag(tagId) // 手动设置高亮
        dispatch(setSearchParam({ word: '', date: dayjs().format('YYYY年MM月DD日'), needSearch: false }))
        await refreshMemoList('byTag', { tag, tagId })
    }

    /**
     * 下拉菜单
     */
    const renderDropdownMenu = (node: TagsNode) => {
        return <Menu onClick={menu => handleClickDropNode(menu, node)} items={menu} />
    }

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
                    <Dropdown overlay={() => renderDropdownMenu(node)} placement="bottom">
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
