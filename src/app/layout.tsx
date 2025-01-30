import { cookies } from 'next/headers'
import ClientWrapper from './components/ClientWrapper'
import Footer from './components/Footer'
import './styles/globals.css'

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isLoggedIn = (await cookies()).has('userId')

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClientWrapper isLoggedIn={isLoggedIn}>
          {children}
        </ClientWrapper>
        <Footer />
      </body>
    </html>
  )
}