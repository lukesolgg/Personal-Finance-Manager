'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, fetchTransactions } from '../store/reducers/transactionSlice';
import type { AppDispatch, RootState } from '../store/store';

const categories = [
  'food', 'utilities', 'housing', 'transportation', 
  'health', 'recreation', 'miscellaneous'
];

export default function TransactionsView() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.id);
  const transactions = useSelector((state: RootState) => state.transactions.items);

  if (!userId) {
    return <div>Please login to view transactions</div>;
  }

  const [form, setForm] = useState<{
    type: 'income' | 'expense';
    amount: string;
    title: string;
    category: string;
    date: string;
  }>({
    type: 'income',
    amount: '',
    title: '',
    category: 'miscellaneous',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchTransactions(userId));
    }
  }, [dispatch, userId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTransaction({
      ...form,
      amount: parseFloat(form.amount),
      userId: userId
    }));
    setForm({
      type: 'income',
      amount: '',
      title: '',
      category: 'miscellaneous',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Income Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Income</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value, type: 'income'})}
              />
              <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 border rounded"
                value={form.amount}
                onChange={(e) => setForm({...form, amount: e.target.value})}
              />
              <select
                className="w-full p-2 border rounded"
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={form.date}
                onChange={(e) => setForm({...form, date: e.target.value})}
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Add Income
              </button>
            </div>
          </form>
        </div>

        {/* Expense Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value, type: 'expense'})}
              />
              <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 border rounded"
                value={form.amount}
                onChange={(e) => setForm({...form, amount: e.target.value})}
              />
              <select
                className="w-full p-2 border rounded"
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={form.date}
                onChange={(e) => setForm({...form, date: e.target.value})}
              />
              <button
                type="submit"
                className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction: any) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.category}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}