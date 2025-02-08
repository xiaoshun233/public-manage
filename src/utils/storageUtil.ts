/**
 * 封装了对 localStorage 的操作方法的工具类。
 */
export class StorageUtil {
  /**
   * 设置带过期时间的 localStorage 项。
   * @param key - 键名。
   * @param value - 值。
   * @param ttl - 过期时间（毫秒）。
   */
  static setItemWithExpiry = (key: string, value: any, ttl: number) => {
    const now = new Date()
    const item = {
      value,
      expiry: now.getTime() + ttl
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  /**
   * 获取带过期时间的 localStorage 项。
   * @param key - 键名。
   * @returns 如果项存在且未过期，则返回对应的值；否则返回 null。
   */
  static getItemWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  /**
   * 移除指定的 localStorage 项。
   * @param key - 键名。
   */
  static removeItem = (key: string) => {
    localStorage.removeItem(key)
  }

  /**
   * 清空所有的 localStorage 项。
   */
  static clear = () => {
    localStorage.clear()
  }

  /**
   * 设置 localStorage 项。
   * @param key - 键名。
   * @param value - 值。
   */
  static setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * 获取 localStorage 项。
   * @param key - 键名。
   * @returns 如果项存在，则返回对应的值；否则返回 null。
   */
  static getItem = (key: string) => {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return null
    }

    return JSON.parse(itemStr)
  }
}
