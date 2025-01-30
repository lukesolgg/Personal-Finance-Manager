import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setUser } from './reducers/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

if (typeof window !== 'undefined') {
  const userFromLocalStorage = localStorage.getItem('user');
  if (userFromLocalStorage) {
    const userData = JSON.parse(userFromLocalStorage);
    // Use setUser instead of login
    store.dispatch(setUser({ 
      email: userData.email, 
      id: userData.id 
    }));
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
