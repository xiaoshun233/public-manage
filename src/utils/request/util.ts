import type { Result } from '../../types'
import { globalInit } from './config'
import { Method, type ContentType } from './enumType'
import { createConfig } from './fetch'

export * from './enumType'

export const getFetch = async <T>(url: string): Promise<Result<T>> => {
  const response = await globalInit.run(url, createConfig(Method.GET))
  const result = await response.json()
  return result
}

export const postFetch = async <T>(
  url: string,
  contentType?: ContentType,
  data?: any
): Promise<Result<T>> => {
  const response = await globalInit.run(url, createConfig(Method.POST, contentType, data))
  const result = await response.json()
  return result
}

export const putFetch = async <T>(
  url: string,
  contentType?: ContentType,
  data?: any
): Promise<Result<T>> => {
  const response = await globalInit.run(url, createConfig(Method.PUT, contentType, data))
  const result = await response.json()
  return result
}

export const deleteFetch = async <T>(
  url: string,
  contentType?: ContentType,
  data?: any
): Promise<Result<T>> => {
  const response = await globalInit.run(url, createConfig(Method.DELETE, contentType, data))
  const result = await response.json()
  return result
}
