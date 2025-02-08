import { jwtDecode } from 'jwt-decode'

export const getDecodedJwt = (jwt: string) => {
  return jwtDecode(jwt)
}

export const getJwtExpiration = (jwt: string) => {
  const decodedJwt = getDecodedJwt(jwt)
  if (!decodedJwt.exp) {
    return null
  }
  return decodedJwt.exp * 1000
}

export const isJwtExpired = (jwt: string) => {
  const expiration = getJwtExpiration(jwt)
  const now = new Date().getTime()
  if (!expiration) {
    return true
  }
  return now > expiration
}
