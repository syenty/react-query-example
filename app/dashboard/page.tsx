'use client'

import { useState } from 'react'
import { useGADashboard } from '@/hooks'

export default function DashboardPage() {
  // 기본값: 이번 달 1일부터 오늘까지
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const [startDate, setStartDate] = useState(firstDayOfMonth.toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0])

  const { data, isLoading, error } = useGADashboard({ startDate, endDate })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">대시보드 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">데이터를 불러오는데 실패했습니다.</p>
          <p className="text-gray-600 mt-2">{error instanceof Error ? error.message : '알 수 없는 오류'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 헤더 및 날짜 선택 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GA 대시보드</h1>
          <p className="text-gray-600 mt-1">Google Analytics 데이터를 확인하세요</p>
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="flex items-center text-gray-500">~</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 주요 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">메인 페이지 조회수</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{data?.mainPageView.totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">세션: {data?.mainPageView.totalSessions.toLocaleString()}</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">폼 페이지 조회수</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{data?.formPageView.totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">세션: {data?.formPageView.totalSessions.toLocaleString()}</p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">활성 사용자</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{data?.mainPageActiveUser.totalActiveUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">신규: {data?.mainPageActiveUser.totalNewUsers.toLocaleString()}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">이탈률</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{data?.quitRate.toFixed(1)}%</p>
            </div>
            <div className="text-4xl">📉</div>
          </div>
        </div>
      </div>

      {/* 클릭 및 참여 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">비디오 클릭</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{data?.videoClickCount.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">폼 클릭</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{data?.formClickCount.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">메인 페이지 참여시간</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{Math.round(data?.mainPageEngagementSeconds || 0)}초</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">폼 페이지 참여시간</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{Math.round(data?.formPageEngagementSeconds || 0)}초</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 메인 페이지 트래픽 소스 */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">메인 페이지 트래픽 소스</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">소스</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">매체</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">조회수</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">사용자</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.mainPageView.data.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.source}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.medium}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.views.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.users.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 폼 페이지 트래픽 소스 */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">폼 페이지 트래픽 소스</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">소스</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">매체</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">조회수</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">사용자</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.formPageView.data.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.source}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.medium}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.views.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.users.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 활성 사용자 데이터 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 메인 페이지 활성 사용자 */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">메인 페이지 활성 사용자</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">소스</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">매체</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">활성</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">신규</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.mainPageActiveUser.data.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.source}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.medium}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.activeUsers.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.newUsers.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 폼 페이지 활성 사용자 */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">폼 페이지 활성 사용자</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">소스</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">매체</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">활성</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">신규</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.formPageActiveUser.data.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.source}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.medium}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.activeUsers.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.newUsers.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
