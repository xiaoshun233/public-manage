import { AUTHORIZATION_TOKEN } from '@/config'
import router from '@/router'
import { notificationLogin } from '@/router/routerMethod'
import { StorageUtil } from '@/utils/storageUtil'
import { type HttpClient, type Interceptor } from '../fetch'
import { refreshInit } from '../config'
import type { Result } from '@/types'

export const AuthorizationInterceptor: Interceptor = {
  callback: async (httpClient: HttpClient) => {
    if (httpClient.response.status === 401) {
      await refreshTokenIfNeeded()
      await restartRequest(httpClient)
    }
  }
}

let refreshTokenPromise: Promise<void> | null = null

async function refreshTokenIfNeeded() {
  if (!refreshTokenPromise) {
    refreshTokenPromise = refreshToken()
  }
  try {
    await refreshTokenPromise
  } finally {
    refreshTokenPromise = null
  }
}

const refreshToken = async () => {
  const response = await refreshInit.run('/refreshToken')
  if (response.status === 200) {
    const result: Result<string> = await response.json()
    StorageUtil.setItemWithExpiry(AUTHORIZATION_TOKEN, result.data, 1000 * 30)
    return
  } else {
    notificationLogin()
    router.push({ name: 'login' })
    throw new Error('认证信息过期，请重新登录')
  }
}

const restartRequest = async (httpClient: HttpClient) => {
  httpClient.request.headers.set(
    'Authorization',
    StorageUtil.getItemWithExpiry(AUTHORIZATION_TOKEN)
  )
  const response = await fetch(httpClient.request)
  if (response.status == 200) {
    httpClient.response = response
  } else {
    throw new Error('服务器异常,请重新登录')
  }
}
