'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const { username } = useSelector((state: RootState) => state.user);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to PFM Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, {username || 'Guest'}</h2>
        <p className="text-lg">Your Personal Finance Dashboard</p>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;