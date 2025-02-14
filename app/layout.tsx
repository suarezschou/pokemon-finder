import "@/app/globals.css"
import type React from "react" // Import React
import localFont from 'next/font/local'

const myFont = localFont({
  src: '../public/fonts/pokemon-solid.ttf',
  display: 'swap',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}