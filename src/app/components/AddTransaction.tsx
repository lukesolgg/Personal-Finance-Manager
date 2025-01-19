import React from 'react';

const AddTransaction: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Add New Transaction</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Description" className="w-full p-2 border rounded" />
        <input type="number" placeholder="Amount" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;