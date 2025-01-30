import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
}

interface FinanceState {
  transactions: Transaction[];
  savings: number[];
  investments: number[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FinanceState = {
  transactions: [],
  savings: [],
  investments: [],
  status: 'idle',
  error: null
};

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setSavings: (state, action: PayloadAction<number[]>) => {
      state.savings = action.payload;
    },
    setInvestments: (state, action: PayloadAction<number[]>) => {
      state.investments = action.payload;
    }
  }
});

export const { setTransactions, setSavings, setInvestments } = financeSlice.actions;
export const selectFinance = (state: RootState) => state.finance;
export default financeSlice.reducer;