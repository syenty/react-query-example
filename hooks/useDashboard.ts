import { useQuery } from '@tanstack/react-query'
import { getGADashboardData } from '@/api'
import { GADashboardData, DashboardQueryParams } from '@/types'

/**
 * GA 대시보드 데이터 조회 훅
 * @param params - 시작일과 종료일을 포함한 쿼리 파라미터
 * @returns GA 대시보드 데이터
 */
export const useGADashboard = (params: DashboardQueryParams) => {
  return useQuery<GADashboardData>({
    queryKey: ['dashboard', 'ga', params.startDate, params.endDate],
    queryFn: () => getGADashboardData(params),
    staleTime: 1000 * 60 * 5, // 5분
    enabled: !!params.startDate && !!params.endDate, // 날짜가 있을 때만 쿼리 실행
  })
}
