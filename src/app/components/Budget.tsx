import React from 'react';

// Placeholder for Pie Chart - you'd use a real charting library here
const PieChartPlaceholder = () => (
  <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
    <div>Pie Chart Placeholder</div>
  </div>
);

const Budget: React.FC = () => {
  const categories = [
    { name: 'Food', spent: 300, budget: 500 },
    { name: 'Housing', spent: 1200, budget: 1200 },
    { name: 'Transportation', spent: 200, budget: 300 },
    { name: 'Savings', spent: 200, budget: 500 },
    { name: 'Debt Repayment', spent: 150, budget: 200 },
    { name: 'Giving', spent: 50, budget: 100 },
    { name: 'Miscellaneous', spent: 100, budget: 200 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Budget</h2>
      
      {/* Pie Chart Section */}
      <div className="bg-white shadow rounded p-4 mb-4">
        <h3 className="text-lg font-bold mb-2">Budget Allocation</h3>
        <PieChartPlaceholder />
      </div>

      {/* How you're doing this month section */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-bold mb-2">How you're doing this month</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Category</th>
              <th className="text-right p-2">Spent</th>
              <th className="text-right p-2">Budget</th>
              <th className="text-right p-2">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{category.name}</td>
                <td className="text-right p-2">£{category.spent.toFixed(2)}</td>
                <td className="text-right p-2">£{category.budget.toFixed(2)}</td>
                <td className="text-right p-2">£{(category.budget - category.spent).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;