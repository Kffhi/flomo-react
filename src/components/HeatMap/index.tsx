import React, { useEffect, useState } from 'react'
import ClassNames from 'classnames'
import { Tooltip } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getDateList } from '@/utils/date'
import { dayItemType, dayMapType, heatMapType } from '@/types/baseInfo'
import { useSearch } from '@/hooks/useSearch'
import './style.less'
import { searchParamT } from '@/store/reducers/memo'
import { setSearchParam } from '@/store/reducers/global'

const HeatMap: React.FC = () => {
    const dispatch = useAppDispatch()
    const heatMap: heatMapType = useAppSelector(state => state.baseInfo.heatMap)
    const { dayList: day, monthList: month } = getDateList()
    const [dayList, setDayList] = useState(day) // 日期列表
    const [monthList, setMonthList] = useState(month) // 月份列表

    // 搜索
    const searchParam: searchParamT = useAppSelector(state => state.global.searchParam)
    const { submitSearch } = useSearch()

    // 将热力数据中的次数记录至dayList
    function completeDayTimes(dayList: dayItemType[], heatMap: dayMapType): dayItemType[] {
        const arr = dayList.map(day => {
            const o = heatMap.get(day.date)
            if (o) {
                day.times = o.times
            }
            return day
        })
        return arr as dayItemType[]
    }

    useEffect(() => {
        setDayList(completeDayTimes(dayList, new Map(heatMap)))
    }, [heatMap])

    // 点击更新选中日期
    const handleClickDay = (data: dayItemType) => {
        dispatch(setSearchParam({ date: data.date, needSearch: true }))
    }

    // TODO: 其实没搞懂为什么要这么写
    useEffect(() => {
        if (searchParam.needSearch) {
            submitSearch(searchParam)
        }
    }, [searchParam.date])

    return (
        <div className={ClassNames('heatMap')}>
            <div className={ClassNames('dayBox')}>
                {dayList.map(day => {
                    return (
                        <Tooltip title={`${day.date} ${day.times}次提交`} key={day.date} mouseEnterDelay={0.05} mouseLeaveDelay={0.05}>
                            <div
                                className={ClassNames(
                                    'dayItem',
                                    { today: day.date === searchParam.date },
                                    { lightGreen: day.times > 0 && day.times < 8 },
                                    { darkGreen: day.times >= 8 }
                                )}
                                onClick={() => handleClickDay(day)}
                            />
                        </Tooltip>
                    )
                })}
            </div>
            <div className={ClassNames('monthBox')}>
                {monthList.map(month => {
                    return (
                        <div className={ClassNames('monthItem', { notExist: month.column === -1 })} key={month.value}>
                            {month.value}月
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HeatMap
