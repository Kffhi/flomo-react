import dayjs from 'dayjs'

import { dayItemType, monthItemType } from '@/types/baseInfo'

/**
 * 获取距今天特定时间间隔的日期列表
 * @param duration 时间间隔
 * @return list 日期列表,包括天数列表和月份列表
 */
export function getDateList(duration: number = 12 * 7) {
    const now = dayjs()
    let startDay = now
    // 最后一天（计算的起始日期）必须是周日
    while (startDay.day() > 0) {
        startDay = startDay.day(startDay.day() + 1)
    }
    // 日期列表
    const dayList: dayItemType[] = new Array(duration)
    // 月份列表
    const monthList: monthItemType[] = new Array(12).fill({}).map((item, index) => {
        return {
            value: index + 1,
            column: -1
        }
    })
    // 辅助函数，在月份列表中查找对应月份对象
    const findMonth = (month: number) => {
        return monthList.find(item => item.value === month)
    }
    // 从后往前循环
    while (duration > 0) {
        // 日期列表
        const day = {
            date: startDay.format('YYYY年MM月DD日'),
            times: 0,
            isToday: startDay.isSame(now)
        }
        dayList[duration - 1] = day

        // 计算月份第一天所在列
        const month = findMonth(startDay.month() + 1)!
        month.column = Math.ceil((duration - 1) / 7)

        // 更新索引及最终日期
        duration -= 1
        startDay = startDay.subtract(1, 'day')
    }
    return { dayList, monthList }
}
