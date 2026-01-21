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
      // 세션 기반 인증 - 서버에서 쿠키로 세션 관리
      // localStorage에 인증 상태만 저장 (선택사항)
      if (data.success) {
        localStorage.setItem('isAuthenticated', 'true')

        // 사용자 정보를 다시 가져오기 위해 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: ['user'] })

        // 대시보드로 이동
        router.push('/dashboard')
      }
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
      localStorage.removeItem('isAuthenticated')

      // 쿼리 캐시 초기화
      queryClient.clear()

      // 로그인 페이지로 이동
      router.push('/login')
    },
    onError: () => {
      // 에러가 발생해도 로그아웃 처리
      localStorage.removeItem('isAuthenticated')
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
