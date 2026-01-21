// 대시보드 통계 타입
export interface DashboardStats {
  totalUsers: number
  todayVisitors: number
  totalContent: number
  activeSessions: number
  userChange?: string
  visitorChange?: string
  contentChange?: string
  sessionChange?: string
}

// 최근 활동 타입
export interface RecentActivity {
  id: number | string
  action: string
  user: string
  timestamp: string
  metadata?: Record<string, any>
}

// 대시보드 데이터 응답 타입
export interface DashboardResponse {
  stats: DashboardStats
  recentActivities: RecentActivity[]
  chartData?: ChartData
}

// 차트 데이터 타입
export interface ChartData {
  labels: string[]
  values: number[]
}
