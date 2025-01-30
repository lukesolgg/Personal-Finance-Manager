"use client";

import React from 'react';
import Link from 'next/link';
import { 
  FaHome, 
  FaFileInvoice, 
  FaMoneyBillAlt, 
  FaPiggyBank,
  FaChartLine,
  FaCog 
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setView, logout } from '../store/reducers/userSlice';
import { RootState } from '../store';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const currentView = useSelector((state: RootState) => state.user.currentView);

  const handleViewChange = (view: string) => {
    dispatch(setView(view));
  };
  
  const navItems = [
    { name: 'Dashboard', view: 'dashboard', icon: <FaHome /> },
    { name: 'Transactions', view: 'transactions', icon: <FaFileInvoice /> },
    { name: 'Budget', view: 'budget', icon: <FaMoneyBillAlt /> },
    { name: 'Savings', view: 'savings', icon: <FaPiggyBank /> },
    { name: 'Investments', view: 'investments', icon: <FaChartLine /> },
  ];

  return (
    <aside className="w-64 bg-white shadow h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Finance Manager</h2>
        <nav className="mt-10">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleViewChange(item.view)}
              className={`flex items-center py-2 px-4 w-full text-left ${
                currentView === item.view 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </button>
          ))}
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
