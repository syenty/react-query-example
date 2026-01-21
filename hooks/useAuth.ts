import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { login, logout, getCurrentUser, changePassword } from '@/api'
import { LoginRequest, User } from '@/types'
import { useRouter } from 'next/navigation'

/**
 * 로그인 훅
 */
export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
    onSuccess: (data) => {
      // 토큰 저장
      localStorage.setItem('accessToken', data.accessToken)
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', data.user.email)

      // 사용자 정보 캐시 업데이트
      queryClient.setQueryData(['user'], data.user)

      // 대시보드로 이동
      router.push('/dashboard')
    },
    onError: (error: any) => {
      console.error('Login failed:', error)
    },
  })
}

/**
 * 로그아웃 훅
 */
export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 로컬 스토리지 정리
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userEmail')

      // 쿼리 캐시 초기화
      queryClient.clear()

      // 로그인 페이지로 이동
      router.push('/login')
    },
    onError: () => {
      // 에러가 발생해도 로그아웃 처리
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userEmail')
      queryClient.clear()
      router.push('/login')
    },
  })
}

/**
 * 현재 사용자 정보 조회 훅
 */
export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5분
    retry: false,
  })
}

/**
 * 비밀번호 변경 훅
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
      changePassword(oldPassword, newPassword),
    onSuccess: () => {
      console.log('Password changed successfully')
    },
  })
}
