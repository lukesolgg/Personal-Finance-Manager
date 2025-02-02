import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import financeReducer from './reducers/financeSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    finance: financeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch