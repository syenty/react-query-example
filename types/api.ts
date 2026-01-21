// 공통 API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: ApiError
}

// API 에러 타입
export interface ApiError {
  code: string
  message: string
  details?: any
}

// 페이지네이션 요청 타입
export interface PaginationRequest {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// 페이지네이션 응답 타입
export interface PaginationResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
