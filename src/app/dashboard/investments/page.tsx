'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';

interface Investment {
  id: number;
  name: string;
  amount: number;
}

export default function InvestmentsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const investments = useSelector((state: RootState) => state.finance.investments
  ) as unknown as Investment[];

  const totalInvestments = investments?.reduce((sum, inv) => 
    sum + (typeof inv === 'object' ? inv.amount : 0), 0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Investment Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Investment</h2>
          <p className="text-gray-500">Investment tracking coming soon...</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
          <div className="space-y-4">
            <p className="text-gray-500">
              Total Investments: ${totalInvestments?.toFixed(2) || '0.00'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Investment List</h2>
        </div>
        <div className="p-6">
          {investments && investments.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment: Investment) => (
                  <tr key={investment.id}>
                    <td className="px-6 py-4">{investment.name}</td>
                    <td className="px-6 py-4">
                      ${investment.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No investments found</p>
          )}
        </div>
      </div>
    </div>
  );
}