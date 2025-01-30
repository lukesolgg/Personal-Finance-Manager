import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchFinanceData } from '../store/reducers/financeSlice';
import axios from 'axios';
import type { Budget as BudgetType } from '../types/index'; // Renamed import

const Budget: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Fixed finance slice access
  const { budgets } = useSelector((state: RootState) => state.finance as FinanceState);
  const userId = useSelector((state: RootState) => state.user.userId);
  const [editingBudget, setEditingBudget] = useState<string | null>(null);
  const [newAmount, setNewAmount] = useState('');

  const handleUpdateBudget = async (category: string) => {
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      await axios.put('/api/budgets', {
        userId,
        category,
        amount: parseFloat(newAmount)
      });
      dispatch(fetchFinanceData(userId));
      setEditingBudget(null);
      setNewAmount('');
    } catch (error) {
      console.error('Budget update error:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Budget Management</h2>
      
      <div className="bg-white shadow rounded p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Category</th>
              <th className="text-right p-2">Allocated</th>
              <th className="text-right p-2">Spent</th>
              <th className="text-right p-2">Remaining</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget: BudgetType, index: number) => (
              <tr key={index} className="border-b">
                <td className="p-2">{budget.category}</td>
                <td className="text-right p-2">
                  {editingBudget === budget.category ? (
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      className="w-24 text-right border rounded py-1 px-2"
                      placeholder={budget.amount.toString()}
                    />
                  ) : (
                    `£${budget.amount.toFixed(2)}`
                  )}
                </td>
                <td className="text-right p-2">
                  £{(budget as any).spent?.toFixed(2) || '0.00'}
                </td>
                <td className="text-right p-2">
                  £{(budget.amount - ((budget as any).spent || 0)).toFixed(2)}
                </td>
                <td className="text-right p-2">
                  {editingBudget === budget.category ? (
                    <button
                      onClick={() => handleUpdateBudget(budget.category)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingBudget(budget.category);
                        setNewAmount(budget.amount.toString());
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;
