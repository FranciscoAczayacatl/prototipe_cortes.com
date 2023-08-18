import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLogin} from './isLogin.slice';
import { setRoleThunk } from "./role.slice";
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
  axios.post('http://localhost:8000/api/v1/auth/login', data)
      .then(response => {
        dispatch(setUser(response.data))
        dispatch(setIsLogin(true));
        dispatch(setRoleThunk());
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