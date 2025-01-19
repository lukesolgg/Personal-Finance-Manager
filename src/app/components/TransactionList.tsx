import React from 'react';

const TransactionList: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
      <ul className="list-disc pl-5">
        <li>Sample Transaction 1</li>
        <li>Sample Transaction 2</li>
      </ul>
    </div>
  );
};

export default TransactionList;