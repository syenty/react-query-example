import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'React Query Example',
  description: 'A Next.js app with React Query',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
