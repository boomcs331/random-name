import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'โปรแกรมสุ่มชื่อ - Thai Name Picker',
  description: 'โปรแกรมสุ่มชื่อภาษาไทย สำหรับการจับฉลาก',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}