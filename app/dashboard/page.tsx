'use client'

export default function DashboardPage() {
  const stats = [
    { name: '총 사용자', value: '1,234', change: '+12%', icon: '👥' },
    { name: '오늘 방문자', value: '456', change: '+8%', icon: '📈' },
    { name: '총 콘텐츠', value: '789', change: '+5%', icon: '📝' },
    { name: '활성 세션', value: '89', change: '+23%', icon: '🔥' },
  ]

  const recentActivities = [
    { action: '새 사용자 가입', user: 'user@example.com', time: '5분 전' },
    { action: '콘텐츠 업데이트', user: 'admin@example.com', time: '15분 전' },
    { action: '설정 변경', user: 'admin@example.com', time: '1시간 전' },
    { action: '새 게시물 등록', user: 'editor@example.com', time: '2시간 전' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-1">전체 시스템 현황을 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-2">{stat.change} vs 지난달</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최근 활동 */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">최근 활동</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">빠른 액션</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="text-2xl mb-2">➕</div>
                <div className="text-sm font-medium text-blue-900">새 사용자</div>
              </button>
              <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <div className="text-2xl mb-2">📄</div>
                <div className="text-sm font-medium text-green-900">새 콘텐츠</div>
              </button>
              <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-purple-900">리포트 생성</div>
              </button>
              <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="text-sm font-medium text-orange-900">시스템 설정</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">주간 방문자 통계</h2>
        </div>
        <div className="p-6">
          <div className="flex items-end justify-between h-64 space-x-2">
            {[65, 45, 78, 52, 88, 67, 92].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-600 mt-2">
                  {['월', '화', '수', '목', '금', '토', '일'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
