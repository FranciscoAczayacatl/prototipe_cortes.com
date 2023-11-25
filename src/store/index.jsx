import { configureStore } from '@reduxjs/toolkit'
import isLogin from './slices/isLogin.slice'
import userSlice from './slices/user.slice'
import isLoadingSlice from './slices/isLoading.slice'

export default configureStore({
  reducer: {
    isLogin:isLogin,
    user:userSlice,
    isLoading:isLoadingSlice,
	}
})