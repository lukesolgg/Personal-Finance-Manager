'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Navbar from './Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const currentView = useSelector((state: RootState) => state.user.currentView);
  
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
}