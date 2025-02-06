import { cookies } from 'next/headers'
import ClientWrapper from './components/ClientWrapper'
import './styles/globals.css'

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isLoggedIn = (await cookies()).has('userId')

  return (
    <html lang="en">
      <body>
        <ClientWrapper isLoggedIn={isLoggedIn}>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}