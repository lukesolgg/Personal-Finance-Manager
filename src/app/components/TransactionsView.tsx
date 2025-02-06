'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, fetchTransactions } from '../store/reducers/transactionSlice';
import type { AppDispatch, RootState } from '../store/store';

const categories = [
  'food', 
  'utilities', 
  'housing', 
  'transportation', 
  'health', 
  'recreation', 
  'miscellaneous'
];

export default function TransactionsView() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.id);
  const transactions = useSelector((state: RootState) => state.transactions.items);
  
  const [form, setForm] = useState({
    type: 'income',
    amount: '',
    title: '',
    category: 'miscellaneous',
    date: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchTransactions(userId));
    }
  }, [dispatch, userId]);

  const handleSubmit = async (e: React.FormEvent, type: 'income' | 'expense') => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await dispatch(addTransaction({
        ...form,
        type,
        amount: parseFloat(form.amount),
        userId: userId!
      })).unwrap();

      setForm({
        type: 'income',
        amount: '',
        title: '',
        category: 'miscellaneous',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      setError('Failed to add transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Income Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Income</h2>
          <form onSubmit={(e) => handleSubmit(e, 'income')}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.amount}
                onChange={(e) => setForm({...form, amount: e.target.value})}
                required
              />
              <select
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.date}
                onChange={(e) => setForm({...form, date: e.target.value})}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Income'}
              </button>
            </div>
          </form>
        </div>

        {/* Expense Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
          <form onSubmit={(e) => handleSubmit(e, 'expense')}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.amount}
                onChange={(e) => setForm({...form, amount: e.target.value})}
                required
              />
              <select
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={form.date}
                onChange={(e) => setForm({...form, date: e.target.value})}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Add Expense'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.category}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${parseFloat(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}