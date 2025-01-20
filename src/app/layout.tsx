"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Header from './components/Header';
import ClientLayout from './ClientLayout';
import Footer from './components/Footer';
import './styles/globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Provider store={store}>
          <Header />
          <ClientLayout>
            {pathname !== '/settings' ? (
              <div className="flex flex-1">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4">
                  {children}
                </main>
              </div>
            ) : (
              <main className="flex-1 overflow-y-auto p-4">
                {children}
              </main>
            )}
          </ClientLayout>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}