import { API_PREFIX, AUTHORIZATION_TOKEN } from '@/config'
import { StorageUtil } from '@/utils/storageUtil'
import { ContentType, Method } from './enumType'

export interface Interceptor {
  callback: (httpClient: HttpClient) => Promise<void> | void
  name?: String
}

export interface HttpClient {
  request: Request
  response: Response
}

export const init = (defaultInit: RequestInit) => {
  const interceptorsBefore: Interceptor[] = []
  const interceptorsAfter: Interceptor[] = []
  const defaultConfig: RequestInit = defaultInit
  return {
    run: async (url: string, config?: RequestInit) => {
      if (config === void 0) {
        config = defaultConfig
      }
      const httpClient: HttpClient = {
        request: new Request(API_PREFIX + url, config),
        response: new Response()
      }
      for (const interceptor of interceptorsBefore) {
        await interceptor.callback(httpClient)
      }
      httpClient.response = await fetch(httpClient.request)
      for (const interceptor of interceptorsAfter) {
        await interceptor.callback(httpClient)
      }
      return httpClient.response
    },
    addInterceptorBefore: (interceptor: Interceptor, order?: number) => {
      if (order !== void 0 && order < interceptorsBefore.length && order >= 0) {
        interceptorsBefore.splice(order, 0, interceptor)
      } else {
        interceptorsBefore.push(interceptor)
      }
      return this
    },
    addInterceptorAfter: (interceptor: Interceptor, order?: number) => {
      if (order !== void 0 && order < interceptorsAfter.length && order >= 0) {
        interceptorsAfter.splice(order, 0, interceptor)
      } else {
        interceptorsAfter.push(interceptor)
      }
      return this
    }
  }
}

export const createConfig = (method: Method, contentType?: ContentType, data?: any) => {
  const config: RequestInit = {
    method,
    headers: {
      Authorization: StorageUtil.getItemWithExpiry(AUTHORIZATION_TOKEN) || ''
    },
    mode: 'cors'
  }
  if (contentType != undefined) {
    setContentTypeAndBody(config, contentType, data)
  }
  return config
}

const setContentTypeAndBody = (config: RequestInit, contentType: ContentType, data: any): void => {
  switch (contentType) {
    case ContentType.JSON:
      ;(config.headers as { [key: string]: string })['Content-Type'] = ContentType.JSON
      config.body = JSON.stringify(data)
      break
    case ContentType.FORMDATA: {
      if (data instanceof FormData) {
        config.body = data
      } else if (data instanceof Object) {
        const formData = new FormData()
        for (const key in data) {
          formData.append(key, data[key])
        }
        config.body = formData
      }
      break
    }
    case ContentType.FORM_URLENCODED:
      ;(config.headers as { [key: string]: string })['Content-Type'] = ContentType.FORM_URLENCODED
      config.body = new URLSearchParams(data)
      break
  }
}
