import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id?: number;
  type: 'income' | 'expense';
  amount: number;
  title: string;
  category: string;
  date: string;
  userId: number;
}

interface TransactionState {
  items: Transaction[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransactionState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (userId: number) => {
    const response = await fetch(`/api/transactions?userId=${userId}`);
    return response.json();
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transaction: Transaction) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    return response.json();
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.items.push(action.payload);
      });
  }
});

export default transactionSlice.reducer;