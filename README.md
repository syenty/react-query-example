# React Query Example - 관리자 대시보드

Next.js와 React Query를 활용한 관리자 대시보드 프로젝트입니다.

## 기술 스택

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **React Query (TanStack Query)** - 서버 상태 관리
- **Axios** - HTTP 클라이언트

## 디렉토리 구조

```
react-query-example/
├── app/                      # Next.js App Router
│   ├── components/          # 공통 컴포넌트
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── dashboard/           # 대시보드 페이지
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login/               # 로그인 페이지
│   │   └── page.tsx
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈 페이지 (리다이렉트)
│   ├── globals.css          # 글로벌 스타일
│   └── providers.tsx        # React Query Provider
│
├── api/                     # API 서비스 함수
│   ├── auth.ts             # 인증 관련 API
│   ├── dashboard.ts        # 대시보드 API
│   └── index.ts
│
├── hooks/                   # React Query 커스텀 훅
│   ├── useAuth.ts          # 인증 훅
│   ├── useDashboard.ts     # 대시보드 훅
│   └── index.ts
│
├── lib/                     # 유틸리티 및 설정
│   └── api-client.ts       # Axios 인스턴스 및 인터셉터
│
├── types/                   # TypeScript 타입 정의
│   ├── api.ts              # 공통 API 타입
│   ├── auth.ts             # 인증 타입
│   ├── dashboard.ts        # 대시보드 타입
│   └── index.ts
│
└── .env.local              # 환경 변수
```

## API 구조 설명

### 1. API 클라이언트 (`lib/api-client.ts`)
- Axios 인스턴스 생성 및 설정
- 요청/응답 인터셉터
  - 자동 토큰 추가
  - 401 에러 시 자동 로그아웃
  - 토큰 갱신 로직 (구현 가능)

### 2. API 서비스 함수 (`api/`)
- 각 도메인별로 API 호출 함수 정의
- `auth.ts`: 로그인, 로그아웃, 사용자 정보 조회 등
- `dashboard.ts`: 대시보드 데이터 조회

### 3. React Query 훅 (`hooks/`)
- API 서비스 함수를 래핑한 커스텀 훅
- `useAuth.ts`: 로그인, 로그아웃, 사용자 정보 조회 훅
- `useDashboard.ts`: 대시보드 데이터 조회 훅
- 캐싱, 자동 갱신, 에러 처리 등 포함

### 4. 타입 정의 (`types/`)
- API 요청/응답 타입
- 공통 타입 및 도메인별 타입

## 환경 변수 설정

`.env.local` 파일에서 API 서버 주소를 설정하세요:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## 시작하기

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 브라우저에서 http://localhost:3000 접속

## 로그인

데모 계정:
- 이메일: admin@example.com
- 비밀번호: admin123

## API 사용 예시

### 컴포넌트에서 React Query 훅 사용

```tsx
'use client'

import { useDashboardData } from '@/hooks'

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardData()

  if (isLoading) return <div>로딩 중...</div>
  if (error) return <div>에러 발생</div>

  return (
    <div>
      <h1>통계: {data?.stats.totalUsers}</h1>
    </div>
  )
}
```

### 로그인 처리

```tsx
'use client'

import { useLogin } from '@/hooks'

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
    </form>
  )
}
```

## 빌드

```bash
npm run build
npm run start
```

## 주요 기능

- ✅ 로그인/로그아웃
- ✅ JWT 토큰 기반 인증
- ✅ 대시보드 통계 조회
- ✅ React Query를 통한 서버 상태 관리
- ✅ 자동 토큰 갱신 (구현 가능)
- ✅ API 에러 핸들링
- ✅ TypeScript 타입 안전성
