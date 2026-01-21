// GA 트래픽 소스별 데이터 타입
export interface GATrafficSourceData {
  source: string
  medium: string
  views: number
  sessions: number
  users: number
}

// GA 트래픽 소스별 활성 사용자 데이터 타입
export interface GATrafficSourceActiveUserData {
  source: string
  medium: string
  activeUsers: number
  newUsers: number
  sessions: number
}

// 페이지 뷰 통계 타입
export interface PageViewStats {
  totalViews: number
  totalSessions: number
  totalUsers: number
  data: GATrafficSourceData[]
}

// 활성 사용자 통계 타입
export interface ActiveUserStats {
  totalActiveUsers: number
  totalNewUsers: number
  totalSessions: number
  data: GATrafficSourceActiveUserData[]
}

// GA 대시보드 데이터 타입
export interface GADashboardData {
  mainPageView: PageViewStats
  formPageView: PageViewStats
  mainPageActiveUser: ActiveUserStats
  formPageActiveUser: ActiveUserStats
  mainPageEngagementSeconds: number
  formPageEngagementSeconds: number
  quitRate: number
  videoClickCount: number
  formClickCount: number
}

// 대시보드 API 응답 타입
export interface DashboardResponse {
  success: boolean
  data: GADashboardData
  message: string
  code: string
  timestamp: string
}

// 대시보드 조회 요청 파라미터 타입
export interface DashboardQueryParams {
  startDate: string  // YYYY-MM-DD 형식
  endDate: string    // YYYY-MM-DD 형식
}
