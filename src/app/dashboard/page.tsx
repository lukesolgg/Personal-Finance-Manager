'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import ProtectedRoute from '../components/ProtectedRoute'

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { email } = useSelector((state: RootState) => state.user)
  const { transactions, savings, investments } = useSelector((state: RootState) => state.finance)

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome, {email}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            {transactions?.length > 0 ? (
              <ul className="space-y-2">
                {transactions.slice(0, 5).map((transaction: any) => (
                  <li key={transaction.id} className="flex justify-between">
                    <span>{transaction.description}</span>
                    <span>${transaction.amount}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent transactions</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Savings</h2>
            {savings?.length > 0 ? (
              <ul className="space-y-2">
                {savings.map((account: any) => (
                  <li key={account.id} className="flex justify-between">
                    <span>{account.name}</span>
                    <span>${account.current_amount}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No savings accounts</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Investments</h2>
            {investments?.length > 0 ? (
              <ul className="space-y-2">
                {investments.map((investment: any) => (
                  <li key={investment.id} className="flex justify-between">
                    <span>{investment.name}</span>
                    <span>${investment.amount}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No investments</p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}