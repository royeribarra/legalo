export const metadata = {
  title: 'Legalo',
  description: 'Abogados especializados',
}

import "@/app/globals.css"
import NavBar from "@/components/NavBar"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
