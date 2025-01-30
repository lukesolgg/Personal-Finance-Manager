"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchFinanceData } from '../store/reducers/financeSlice';

const TransactionForm: React.FC<{ title: string, type: 'income' | 'expense' | 'savings' | 'investment' }> = ({ title, type }) => {
  const [formData, setFormData] = useState({
    toFrom: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: ''
  });
  
  const userId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch<AppDispatch>();

  const categories = {
    income: ['Salary', 'Freelance', 'Dividends', 'Other'],
    expense: ['Food', 'Housing', 'Transport', 'Entertainment'],
    savings: ['Emergency Fund', 'Vacation', 'Retirement'],
    investment: ['Stocks', 'Crypto', 'Real Estate']
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/transactions', {
        ...formData,
        amount: parseFloat(formData.amount),
        type,
        userId
      });
      
      dispatch(fetchFinanceData(userId));
      setFormData({
        toFrom: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
        category: ''
      });
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Existing fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            {categories[type].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button 
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
