import type { RouteLocationNormalized } from 'vue-router'
import { StorageUtil, getJwtExpiration, isJwtExpired } from '../utils'
import { AUTHORIZATION_TOKEN } from '../config'
import { refreshTimeOutStore } from '../stores'
import { ElNotification } from 'element-plus'

export const setMeta = (to: RouteLocationNormalized) => {
  document.title = to.meta.title as string
  const icon =
    (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
    document.createElement('link')
  icon.type = 'image/x-icon'
  icon.rel = 'shortcut icon'
  icon.href = (to.meta.favicon as string) || '默认的favicon路径'
  document.head.appendChild(icon)
}

export const isAuthorization = () => {
  const token = StorageUtil.getItemWithExpiry(AUTHORIZATION_TOKEN)
  // 如果 token 不存在或者已经过期，则返回 false
  if (!token || isJwtExpired(token)) {
    return false
  } else {
    return true
  }
}

export const refreshAuthorization = async () => {
  if (refreshTimeOutStore().getRefreshTimeOut() !== null) {
    return
  }

  const expiration = getJwtExpiration(StorageUtil.getItemWithExpiry(AUTHORIZATION_TOKEN))
  const now = new Date().getTime()
  const thirtyMinutesBeforeExpiration = expiration! - 30 * 60 * 1000
  const delay = thirtyMinutesBeforeExpiration - now
  if (delay > 0) {
    // 如果 token 还没有接近过期，则设置定时器
    refreshTimeOutStore().setRefreshTimeOut(delay)
  } else {
    // 如果 token 已经接近过期，立即刷新 token
    refreshTimeOutStore().refreshToken()
  }
}

export const notificationLogin = () => {
  // 通知登录
  ElNotification({
    title: '登录提醒',
    message: '请先登录',
    type: 'warning',
    duration: 2000
  })
}
