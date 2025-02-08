import { REFRECH_TOKEN } from '@/config'
import { StorageUtil } from '../storageUtil'
import { Method } from './enumType'
import { createConfig, init } from './fetch'
import { AuthorizationInterceptor } from './interceptor/AuthorizationInterceptor'
import { PublicInterceptor } from './interceptor/PublicInterceptor'

export const globalInit = init(createConfig(Method.GET))

globalInit.addInterceptorAfter(AuthorizationInterceptor)
globalInit.addInterceptorAfter(PublicInterceptor)

export const refreshInit = init({
  method: Method.GET,
  headers: {
    Authorization: StorageUtil.getItemWithExpiry(REFRECH_TOKEN),
    mode: 'cors'
  }
})
