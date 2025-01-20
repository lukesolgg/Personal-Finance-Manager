import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  username: string;
  email?: string;
  currentView: 'dashboard' | 'transactions' | 'budget';
}

const initialState: UserState = {
  isLoggedIn: false,
  username: '',
  email: '',
  currentView: 'dashboard',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string, password: string }>) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.username = action.payload.email.split('@')[0];
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = '';
      state.email = '';
      state.currentView = 'dashboard';
    },
    registerUser: (state, action: PayloadAction<{ email: string, password: string }>) => {
      localStorage.setItem('user', JSON.stringify({ email: action.payload.email, isLoggedIn: true }));
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.username = action.payload.email.split('@')[0];
    },
    setView: (state, action: PayloadAction<'dashboard' | 'transactions' | 'budget'>) => {
      state.currentView = action.payload;
    },
  },
});

export const { login, logout, registerUser, setView } = userSlice.actions;

export default userSlice.reducer;