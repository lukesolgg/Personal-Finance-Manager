"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchFinanceData } from '../store/reducers/financeSlice';

const SavingsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: ''
  });
  
  const userId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/savings', {
        ...formData,
        userId,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount)
      });
      
      dispatch(fetchFinanceData(userId));
      setFormData({ name: '', targetAmount: '', currentAmount: '' });
    } catch (error) {
      console.error('Savings error:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Add Savings Goal</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Form fields */}
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add Savings
        </button>
      </form>
    </div>
  );
};

export default SavingsForm;
