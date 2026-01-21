import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

// API 클라이언트 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
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
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // 401 에러 (인증 실패) 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // 토큰 갱신 로직 (필요한 경우)
      // const refreshToken = localStorage.getItem('refreshToken')
      // if (refreshToken) {
      //   try {
      //     const response = await axios.post('/auth/refresh', { refreshToken })
      //     localStorage.setItem('accessToken', response.data.accessToken)
      //     return apiClient(originalRequest)
      //   } catch (refreshError) {
      //     // 리프레시 실패 시 로그아웃
      //     localStorage.removeItem('accessToken')
      //     localStorage.removeItem('refreshToken')
      //     window.location.href = '/login'
      //     return Promise.reject(refreshError)
      //   }
      // }

      // 토큰이 없거나 리프레시 토큰이 없는 경우 로그인 페이지로
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
