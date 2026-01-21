import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

// API 클라이언트 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 세션 쿠키를 자동으로 포함
})

// 요청 인터셉터: 세션 기반 인증에서는 쿠키가 자동으로 포함되므로 토큰 추가 불필요
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터: 에러 핸들링
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 401 에러 (인증 실패) 처리 - 세션 만료
    if (error.response?.status === 401) {
      // 세션이 만료되었으므로 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isAuthenticated')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
