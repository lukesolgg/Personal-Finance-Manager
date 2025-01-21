import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import './styles/globals.css';
import Footer from './components/Footer';

// Client components for dynamic behavior
const DynamicHeader = dynamic(() => import('./components/Header'));
const DynamicClientLayout = dynamic(() => import('./components/ClientLayout'));
const DynamicProvider = dynamic(() => import('./components/ReduxProvider'));

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = (await cookies()).has('userId'); // Server-side logic

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        

        {/* Client-side logic */}
        <DynamicProvider>
          <DynamicHeader />
          <DynamicClientLayout>
            {children}
          </DynamicClientLayout>
          <Footer />
        </DynamicProvider>
      </body>
    </html>
  );
}