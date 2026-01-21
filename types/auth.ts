// 로그인 요청 타입
export interface LoginRequest {
  id: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
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

// 토큰 갱신 요청 타입
export interface RefreshTokenRequest {
  refreshToken: string;
}

// 토큰 갱신 응답 타입
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}
