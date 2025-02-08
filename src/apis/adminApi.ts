import type { AdminView, ChangePasswordDto, LoginDto, RegisterAdminDto, TokenDto } from '@/types'
import { ContentType, StorageUtil, getFetch, postFetch, putFetch } from '../utils'
import { ADMININFO, API_PREFIX, AUTHORIZATION_TOKEN, REFRECH_TOKEN } from '../config'

export const registerAdmin = async (data: RegisterAdminDto) => {
  const result = await postFetch<TokenDto>('/registerAdmin', ContentType.JSON, data)
  StorageUtil.setItemWithExpiry(AUTHORIZATION_TOKEN, result.data.accessToken, 1000 * 60 * 30)
  StorageUtil.setItemWithExpiry(REFRECH_TOKEN, result.data.refreshToken, 1000 * 60 * 60 * 24 * 7)
}

export const loginAdmin = async (loginDto: LoginDto) => {
  const result = await postFetch<TokenDto>('/loginAdmin', ContentType.JSON, loginDto)
  StorageUtil.setItemWithExpiry(AUTHORIZATION_TOKEN, result.data.accessToken, 1000 * 60 * 30)
  StorageUtil.setItemWithExpiry(REFRECH_TOKEN, result.data.refreshToken, 1000 * 60 * 60 * 24 * 7)
}

export const getAdminInfo = async () => {
  const result = await getFetch<AdminView>('/getAdminInfo')
  if (!result.code) {
    StorageUtil.setItemWithExpiry(ADMININFO, result.data, 1000 * 60 * 30)
  }
  return result
}

export const sendEmailVerificationCodeAdmin = async (email: string) => {
  const result = await postFetch<string>('/sendEmailVerificationCodeAdmin', ContentType.FORMDATA, {
    email: email
  })
  return result
}

export const getAdminInvitationCode = async () => {
  const result = await getFetch<string>('/getAdminInvitationCode')
  return result
}

export const resetAdminInvitationCode = async () => {
  const result = await postFetch<string>('/resetAdminInvitationCode')
  return result
}

export const sendEmailVerificationCodeJWT = async () => {
  const result = await postFetch<string>('/sendEmailVerificationCodeJWT')
  return result
}

export const changeAdminPassword = async (data: ChangePasswordDto) => {
  const result = await putFetch<string>('/changeAdminPassword', ContentType.JSON, data)
  return result
}

export const layoutAdmin = async () => {
  const result = await fetch(API_PREFIX + '/layoutAdmin', {
    method: 'GET',
    headers: {
      Authorization: StorageUtil.getItemWithExpiry(REFRECH_TOKEN)
    },
    mode: 'cors'
  })
  return result
}
