export interface UserView {
  id: number
  username: string
  email: string
  nickname: string
  headshot: string
  regtime: Date
  lastlogintime: Date
  state: number
}

export interface UserEntity {
  user_id: number
  user_username: string
  user_password: string
  user_email: string
  user_nickname: string
  user_headshot: string
  user_lastlogintime: Date
  user_regtime: Date
  user_state_id: number
}

export interface BanUserDto {
  userId: number
  banReason: string
  banDay: number
}

export interface BanUserView {
  banId: number
  banReason: string
  banStartTime: Date
  banExpireTime: Date
  userView: UserView
}
