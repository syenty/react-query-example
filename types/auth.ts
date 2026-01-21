// 로그인 요청 타입
export interface LoginRequest {
  id: string;
  password: string;
}

// 로그인 응답 타입 (세션 기반 - 토큰 없음)
export interface LoginResponse {
  success: boolean;
  data: null;
  message: string;
  code: string;
  timestamp: string;
}

// 사용자 타입
export interface User {
  id: number | string;
  email: string;
  name: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

