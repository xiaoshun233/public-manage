import type { SubjectEntity, SubjectInfoDto } from '../types'
import { ContentType, deleteFetch, getFetch, postFetch, putFetch } from '../utils'

export const getAllSubjects = async () => {
  const result = await getFetch<SubjectEntity[]>('/getAllSubjects')
  return result
}

export const getSubjectInfo = async (id: number) => {
  const result = await getFetch<SubjectEntity>(`/getSubjectInfo/${id}`)
  return result
}

export const deleteSubject = async (id: number) => {
  const result = await deleteFetch<void>(`/deleteSubject/${id}`)
  return result
}

export const updateSubjectInfo = async (id: number, subject: SubjectInfoDto) => {
  const result = await putFetch<void>(`/updateSubjectInfo/${id}`, ContentType.JSON, subject)
  return result
}

export const updateSubjectCover = async (id: number, cover: FormData) => {
  const result = await putFetch<void>(`/updateSubjectCover/${id}`, ContentType.FORMDATA, cover)
  return result
}
export const addSubject = async (formData: FormData) => {
  const result = await postFetch<void>('/addSubject', ContentType.FORMDATA, formData)
  return result
}
