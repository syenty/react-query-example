'use client'

import { useState, FormEvent } from 'react'
import { useLogin } from '@/hooks'

export default function LoginPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login, isPending, error: loginError } = useLogin()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    login({ id, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">관리자 로그인</h2>
          <p className="mt-1 text-sm text-gray-600">관리자 계정으로 로그인하세요</p>
        </div>

        {/* 폼 */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* 아이디 */}
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
              아이디
            </label>
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="username"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="아이디를 입력하세요"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {/* 에러 메시지 */}
          {loginError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
              {loginError instanceof Error ? loginError.message : '로그인에 실패했습니다. 다시 시도해주세요.'}
            </div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? '로그인 중...' : '로그인'}
          </button>

          {/* 데모 계정 안내 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500 mb-2">데모 계정</p>
            <div className="text-center space-y-1 bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                아이디: <span className="font-semibold text-blue-600">admin</span>
              </p>
              <p className="text-sm text-gray-700">
                비밀번호: <span className="font-semibold text-blue-600">admin123</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
