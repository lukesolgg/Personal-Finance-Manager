import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: number | null
  email: string | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  id: null,
  email: null,
  isAuthenticated: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: number; email: string }>) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.id = null
      state.email = null
      state.isAuthenticated = false
    }
  }
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer