'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const DynamicHeader = dynamic(() => import('./Header'))
const DynamicClientLayout = dynamic(() => import('./ClientLayout'))
const DynamicReduxProvider = dynamic(
  () => import('./ReduxProvider'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
)

export default function ClientWrapper({ 
  children,
  isLoggedIn 
}: { 
  children: ReactNode
  isLoggedIn: boolean 
}) {
  return (
    <DynamicReduxProvider>
      <DynamicHeader />
      <DynamicClientLayout>
        {children}
      </DynamicClientLayout>
    </DynamicReduxProvider>
  )
}