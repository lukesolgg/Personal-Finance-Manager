import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  id: number | null;
  isAuthenticated: boolean;
  currentView: string;
}

const initialState: UserState = {
  email: null,
  id: null,
  isAuthenticated: false,
  currentView: 'dashboard'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; id: number }>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = null;
      state.id = null;
      state.isAuthenticated = false;
    },
    setView: (state, action: PayloadAction<string>) => {
      state.currentView = action.payload;
    }
  }
});

export const { setUser, logout, setView } = userSlice.actions;
export default userSlice.reducer;