import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { login } from './reducers/userSlice';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Check for user in localStorage only on the client side
if (typeof window !== 'undefined') {
  const userFromLocalStorage = localStorage.getItem('user');
  if (userFromLocalStorage) {
    const userData = JSON.parse(userFromLocalStorage);
    store.dispatch(login({ email: userData.email, password: '' })); // Password doesn't matter for persistence
  }
}

export default store;