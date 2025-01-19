import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Finance Manager</h2>
        <nav className="mt-10">
          <Link href="/" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Dashboard</Link>
          <Link href="/transactions" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Transactions</Link>
          <Link href="/budget" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Budget</Link>
          <Link href="/settings" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">Settings</Link>
        </nav>
      </div>
    </aside>
  );
};

export default Navbar;