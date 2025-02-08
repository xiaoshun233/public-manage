import type { PageInfoView, TitleEntity, TitleInfoDto, TitleView } from '../types'
import { ContentType, deleteFetch, getFetch, postFetch, putFetch } from '../utils'

export const getTitles = async (page: number) => {
  const result = await getFetch<PageInfoView<TitleEntity>>(`/getTitles/${page}`)
  return result
}

export const getTitlesOrder = async (page: number, field: string, order: string) => {
  const result = await getFetch<PageInfoView<TitleEntity>>(
    `/getTitlesOrder/${page}/${field}/${order}`
  )
  return result
}

export const getTitleByID = async (id: number) => {
  const result = await getFetch<TitleEntity>(`/getTitleByID/${id}`)
  return result
}

export const getTitleViewByTitleId = async (id: number) => {
  const result = await getFetch<TitleView>(`/getTitleViewByTitleID/${id}`)
  return result
}

export const getTitlesBySubjectId = async (id: number) => {
  const result = await getFetch<TitleEntity[]>(`/getTitlesBySubjectID/${id}`)
  return result
}

export const searchTitles = async (page: number, keyword: string) => {
  const result = await getFetch<PageInfoView<TitleEntity>>(`/searchTitles/${page}/${keyword}`)
  return result
}

export const deleteTitle = async (id: number) => {
  const result = await deleteFetch(`/deleteTitle/${id}`)
  return result
}

export const updateTitleInfo = async (id: number, TitleInfoDto: TitleInfoDto) => {
  const result = await putFetch<void>(`/updateTitleInfo/${id}`, ContentType.JSON, TitleInfoDto)
  return result
}

export const updateTitleCover = async (id: number, cover: FormData) => {
  const result = await putFetch<void>(`/updateTitleCover/${id}`, ContentType.FORMDATA, cover)
  return result
}

export const addTitle = async (formData: FormData) => {
  const result = await postFetch<void>('/addTitle', ContentType.FORMDATA, formData)
  return result
}
