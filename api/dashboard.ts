import apiClient from "@/lib/api-client";
import { DashboardResponse, DashboardQueryParams, GADashboardData } from "@/types";

/**
 * GA 대시보드 데이터 조회 API
 * @param params - 시작일과 종료일을 포함한 쿼리 파라미터
 * @returns GA 대시보드 데이터
 */
export const getGADashboardData = async (
  params: DashboardQueryParams,
): Promise<GADashboardData> => {
  const response = await apiClient.get<DashboardResponse>("/v1/contributors/dashboard/ga", {
    params: {
      startDate: params.startDate,
      endDate: params.endDate,
    },
  });
  return response.data.data;
};
