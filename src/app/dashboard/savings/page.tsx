'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';

interface SavingsAccount {
  id: number;
  name: string;
  current_amount: number;
}

export default function SavingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const savings = useSelector((state: RootState) => state.finance.savings
  ) as unknown as SavingsAccount[];

  const totalSavings = savings?.reduce((sum, acc) => 
    sum + (typeof acc === 'object' ? acc.current_amount : 0), 0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Savings Accounts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Savings Account</h2>
          <p className="text-gray-500">Savings account tracking coming soon...</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Savings Summary</h2>
          <div className="space-y-4">
            <p className="text-gray-500">
              Total Savings: ${totalSavings?.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Savings Accounts</h2>
        </div>
        <div className="p-6">
          {savings && savings.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Account Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Current Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {savings.map((account: SavingsAccount) => (
                  <tr key={account.id}>
                    <td className="px-6 py-4">{account.name}</td>
                    <td className="px-6 py-4">
                      ${account.current_amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No savings accounts found</p>
          )}
        </div>
      </div>
    </div>
  );
}