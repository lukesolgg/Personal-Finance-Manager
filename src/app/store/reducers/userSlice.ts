import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ViewType = 'dashboard' | 'transactions' | 'savings' | 'investments';

interface UserState {
  id: number | null;
  email: string | null;
  isAuthenticated: boolean;
  currentView: ViewType;
}

const initialState: UserState = {
  id: null,
  email: null,
  isAuthenticated: false,
  currentView: 'dashboard'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: number; email: string }>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    setView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload;
    },
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.isAuthenticated = false;
      state.currentView = 'dashboard';
    }
  }
});

export const { setUser, setView, logout } = userSlice.actions;
export default userSlice.reducer;