/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

export const isLoginSlice = createSlice({
    name: 'isLogin',
    initialState: false,
    reducers: {
      setIsLogin: (state, action) => {
        return action.payload;
      },
      logout: (state, action) => {
        return false;
      },
    }
})

export const { setIsLogin,logout } = isLoginSlice.actions;

export default isLoginSlice.reducer;