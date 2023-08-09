import { configureStore } from '@reduxjs/toolkit'
import isLogin from './slices/isLogin.slice'
import userSlice from './slices/user.slice'
import roleSlice from './slices/role.slice'

export default configureStore({
  reducer: {
    isLogin:isLogin,
    user:userSlice,
    role:roleSlice
	}
})