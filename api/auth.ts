import apiClient from '@/lib/api-client'
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse, User } from '@/types'

/**
 * 로그인 API
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
  return response.data
}

/**
 * 로그아웃 API
 */
export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout')
}

/**
 * 토큰 갱신 API
 */
export const refreshToken = async (request: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
  const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', request)
  return response.data
}

/**
 * 현재 사용자 정보 조회 API
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/auth/me')
  return response.data
}

/**
 * 비밀번호 변경 API
 */
export const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  await apiClient.post('/auth/change-password', { oldPassword, newPassword })
}
