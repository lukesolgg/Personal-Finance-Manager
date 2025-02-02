'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import ProtectedRoute from './ProtectedRoute'

const DynamicHeader = dynamic(() => import('./Header'))
const DynamicNavbar = dynamic(() => import('./Navbar'))

interface ClientWrapperProps {
  children: ReactNode
  isLoggedIn: boolean
}

export default function ClientWrapper({ children, isLoggedIn }: ClientWrapperProps) {
  return (
    <Provider store={store}>
      {isLoggedIn ? (
        <ProtectedRoute>
          <div>
            <DynamicHeader />
            <DynamicNavbar />
            <main>
              {children}
            </main>
          </div>
        </ProtectedRoute>
      ) : (
        children
      )}
    </Provider>
  )
}