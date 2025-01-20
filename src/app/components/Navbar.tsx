"use client";

import React from 'react';
import Link from 'next/link';
import { FaHome, FaFileInvoice, FaMoneyBillAlt, FaCog } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setView } from '../store/reducers/userSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSetView = (view: 'dashboard' | 'transactions' | 'budget') => {
    dispatch(setView(view));
  };

  return (
    <aside className="w-64 bg-white shadow h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Finance Manager</h2>
        <nav className="mt-10">
          <button onClick={() => handleSetView('dashboard')} className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200 w-full text-left">
            <FaHome className="mr-2"/>
            Dashboard
          </button>
          <button onClick={() => handleSetView('transactions')} className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200 w-full text-left">
            <FaFileInvoice className="mr-2"/>
            Transactions
          </button>
          <button onClick={() => handleSetView('budget')} className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200 w-full text-left">
            <FaMoneyBillAlt className="mr-2"/>
            Budget
          </button>
          <Link href="/settings" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200 w-full text-left">
            <FaCog className="mr-2"/>
            Settings
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;