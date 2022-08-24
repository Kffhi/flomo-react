/**
 * 获取临时的uuid，与后端生成uuid的方法不一样
 * @returns uuid
 */
export function getTempUuid(): string {
    const tempUrl: string = URL.createObjectURL(new Blob())
    const uuid: string = tempUrl.toString()
    URL.revokeObjectURL(tempUrl) // 释放资源
    return uuid.substring(uuid.lastIndexOf('/') + 1)
}
