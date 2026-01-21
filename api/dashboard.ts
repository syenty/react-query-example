import apiClient from '@/lib/api-client'
import { DashboardResponse, DashboardStats, RecentActivity } from '@/types'

/**
 * 대시보드 전체 데이터 조회 API
 */
export const getDashboardData = async (): Promise<DashboardResponse> => {
  const response = await apiClient.get<DashboardResponse>('/dashboard')
  return response.data
}

/**
 * 대시보드 통계 조회 API
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get<DashboardStats>('/dashboard/stats')
  return response.data
}

/**
 * 최근 활동 조회 API
 */
export const getRecentActivities = async (limit?: number): Promise<RecentActivity[]> => {
  const response = await apiClient.get<RecentActivity[]>('/dashboard/activities', {
    params: { limit: limit || 10 },
  })
  return response.data
}

/**
 * 차트 데이터 조회 API
 */
export const getChartData = async (period: 'week' | 'month' | 'year' = 'week') => {
  const response = await apiClient.get('/dashboard/chart', {
    params: { period },
  })
  return response.data
}
