'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';

interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
}

interface SavingsAccount {
  id: number;
  name: string;
  current_amount: number;
}

interface Investment {
  id: number;
  name: string;
  amount: number;
}

interface DashboardFinanceState {
  transactions: Transaction[];
  savings: SavingsAccount[];
  investments: Investment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const finance = useSelector((state: RootState) => state.finance) as unknown as DashboardFinanceState;
  const { transactions = [], savings = [], investments = [], status, error } = finance;
  const userId = useSelector((state: RootState) => state.user.id);

  const calculateTotals = () => {
    const income = transactions
      .filter((t: Transaction) => t.type === 'income')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
      
    const spending = transactions
      .filter((t: Transaction) => t.type === 'expense')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    const savingsTotal = savings
      .reduce((sum: number, s: SavingsAccount) => sum + s.current_amount, 0);
    
    const investmentsTotal = investments
      .reduce((sum: number, i: Investment) => sum + i.amount, 0);

    return { income, spending, savings: savingsTotal, investments: investmentsTotal };
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Error: {error}
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ${totals.income.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Total Spending</h3>
          <p className="text-2xl font-bold text-red-600">
            ${totals.spending.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Total Savings</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${totals.savings.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Total Investments</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${totals.investments.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
        </div>
        <div className="divide-y">
          {transactions.slice(0, 5).map((transaction: Transaction) => (
            <div key={transaction.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <span className={`font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                ${transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;