'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { usePathname } from 'next/navigation'

const DynamicHeader = dynamic(() => import('./Header'))
const DynamicNavbar = dynamic(() => import('./Navbar'))

interface ClientWrapperProps {
  children: ReactNode
  isLoggedIn: boolean
}

export default function ClientWrapper({ children, isLoggedIn }: ClientWrapperProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/register'

  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        {!isAuthPage && isLoggedIn && (
          <>
            <DynamicHeader />
            <DynamicNavbar />
          </>
        )}
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </Provider>
  )
}