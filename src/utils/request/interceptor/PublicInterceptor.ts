import { ElMessage } from 'element-plus'
import type { HttpClient, Interceptor } from '../fetch'
import type { Result } from '@/types'

export const PublicInterceptor: Interceptor = {
  callback: async (httpClient: HttpClient) => {
    if (httpClient.response.status !== 200 && httpClient.response.status !== 401) {
      const result: Result<string> = await Object.assign(httpClient.response).clone().json()
      if (result.msg) {
        logAndThrow(result.msg)
      } else {
        logAndThrow('服务器异常')
      }
    }
  }
}

const logAndThrow = (msg: string) => {
  ElMessage.error(msg)
  throw new Error(msg)
}
