import React from 'react';
import SavingsForm from './SavingsForm';

const Savings: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Savings</h2>
      <SavingsForm />
    </div>
  );
};

export default Savings;
