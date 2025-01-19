'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Finance Manager</Link>
          <div>
            {isLoggedIn ? (
              <Link href="/" className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Dashboard</Link>
            ) : (
              <Link href="/login" className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">Login</Link>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default Layout;