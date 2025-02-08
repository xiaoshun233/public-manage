export interface RegisterAdminDto {
  username: string
  password: string
  confirmPassword: string
  email: string
  emailVerificationCode: string
  invitationCode: string
}

export interface LoginDto {
  account: string
  password: string
}

export interface AdminView {
  id: number
  username: string
  email: string
  regtime: Date
  lastlogintime: Date
  permission: number
}

export interface ChangePasswordDto {
  password: string
  confirmPassword: string
  emailVerificationCode: string
}

export interface TokenDto {
  accessToken: string
  refreshToken: string
}
