'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
};

export default ClientLayout;