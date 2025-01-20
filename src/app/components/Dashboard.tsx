"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Transactions from './Transactions';
import Budget from './Budget';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const { currentView } = useSelector((state: RootState) => state.user);

  let content;
  switch (currentView) {
    case 'transactions':
      content = <Transactions />;
      break;
    case 'budget':
      content = <Budget />;
      break;
    default:
      content = (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {['Income', 'Spending', 'Savings', 'Investment'].map((category, index) => (
              <div key={index} className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-bold">{category}</h3>
                <div className="text-2xl font-bold">£{index === 0 ? '1,422' : index === 1 ? '900' : index === 2 ? '522' : '1,000'}</div>
                <div className="text-green-600 flex items-center mt-2">
                  {category === 'Spending' ? <FaArrowDown /> : <FaArrowUp />} 
                  <span className="ml-1">{(index * 2.1).toFixed(1)}%</span>
                </div>
                <div className="text-sm">
                  {category === 'Spending' ? '-' : '+'}{index * 113} than last month
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-white shadow rounded p-4 flex-1">
              <h3 className="text-lg font-bold mb-4">Statistics</h3>
              {/* Here you would implement or import a chart component, e.g., using react-chartjs-2 or recharts */}
              <div className="w-full h-64 bg-gray-200">Income vs Expenses Chart Placeholder</div>
            </div>
            <div className="bg-white shadow rounded p-4 flex-1">
              <h3 className="text-lg font-bold mb-4">Savings & Investments</h3>
              <ul className="space-y-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item} className="flex justify-between">
                    <span>Bitcoin</span>
                    <span>£4,555 / £10,000</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white shadow rounded p-4">
            <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
            <table className="w-full">
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="border-b">
                    <td className="p-2">Transaction {item}</td>
                    <td className="p-2 text-right">£50.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button 
              onClick={() => {/* Redirect to Transactions component */}}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              View More
            </button>
          </div>
        </div>
      );
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {content}
    </main>
  );
};

export default Dashboard;