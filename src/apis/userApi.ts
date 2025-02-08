import type { BanUserDto, BanUserView, PageInfoView, UserEntity, UserView } from '../types'
import { ContentType, getFetch, putFetch } from '../utils'

export const getUserList = async (page: number) => {
  const result = await getFetch<PageInfoView<UserView>>(`/getUserList/${page}`)
  return result
}

export const getUserByID = async (id: number) => {
  const result = await getFetch<UserEntity>(`/getUserByID/${id}`)
  return result
}
export const getBanUserList = async (page: number) => {
  const result = await getFetch<PageInfoView<BanUserView>>(`/getBanUserList/${page}`)
  return result
}

export const banUser = async (banUserDto: BanUserDto) => {
  const result = await putFetch<void>('/banUser', ContentType.JSON, banUserDto)
  return result
}

export const unbanUser = async (userId: number) => {
  const result = await putFetch<void>(`/unbanUser/${userId}`)
  return result
}
