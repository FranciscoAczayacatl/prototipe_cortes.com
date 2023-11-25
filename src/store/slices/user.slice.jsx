import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLogin} from './isLogin.slice';
import { setIsLoading } from './isLoading.slice';


export const userSlice = createSlice({
    name: 'User',
    initialState: [],
    reducers: {
      setUser: (state, action) => {
        return action.payload;
      }
    }
})

export const loginThunk = (data) => (dispatch) =>{
  dispatch(setIsLoading(true));
  axios.post(`${import.meta.env.VITE_AUTH_USER}`, data)
      .then(response => {
        dispatch(setUser(response.data))
        dispatch(setIsLogin(true));
      })
      .catch(error => {
        if(error.response?.status===404){
          alert('credenciales incorrectas')
        }else if(error.response?.status===400){
        alert(error.response?.data.message); 
      }
      }).finally(() => dispatch(setIsLoading(false)));
}



export const { setUser } = userSlice.actions;

export default userSlice.reducer;