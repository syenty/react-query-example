import { useQuery } from '@tanstack/react-query'
import { getDashboardData, getDashboardStats, getRecentActivities, getChartData } from '@/api'
import { DashboardResponse, DashboardStats, RecentActivity } from '@/types'

/**
 * 대시보드 전체 데이터 조회 훅
 */
export const useDashboardData = () => {
  return useQuery<DashboardResponse>({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
    staleTime: 1000 * 60, // 1분
    refetchInterval: 1000 * 60 * 5, // 5분마다 자동 갱신
  })
}

/**
 * 대시보드 통계 조회 훅
 */
export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60, // 1분
  })
}

/**
 * 최근 활동 조회 훅
 */
export const useRecentActivities = (limit?: number) => {
  return useQuery<RecentActivity[]>({
    queryKey: ['dashboard', 'activities', limit],
    queryFn: () => getRecentActivities(limit),
    staleTime: 1000 * 30, // 30초
  })
}

/**
 * 차트 데이터 조회 훅
 */
export const useChartData = (period: 'week' | 'month' | 'year' = 'week') => {
  return useQuery({
    queryKey: ['dashboard', 'chart', period],
    queryFn: () => getChartData(period),
    staleTime: 1000 * 60 * 5, // 5분
  })
}
