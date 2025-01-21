import React, { useState } from 'react';
import TransactionForm from './TransactionForm';

const Transactions: React.FC = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TransactionForm title="Add New Income" />
        <TransactionForm title="Add New Expense" />
      </div>
      {/* Placeholder for transaction list */}
      <div className="bg-white shadow rounded p-4 mt-4">
        <h2 className="text-lg font-bold mb-2">Transactions</h2>
        <p>List of transactions will be displayed here.</p>
      </div>
    </div>
  );
};

export default Transactions;