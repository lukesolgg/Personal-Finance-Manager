'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Header: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Personal Finance Manager</Link>
        <div>
          {isLoggedIn ? (
            <Link href="/" className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Dashboard</Link>
          ) : (
            <Link href="/login" className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;