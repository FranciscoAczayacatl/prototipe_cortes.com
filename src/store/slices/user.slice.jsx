import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLogin} from './isLogin.slice';

export const userSlice = createSlice({
    name: 'User',
    initialState: [],
    reducers: {
      setUser: (state, action) => {
        return action.payload;
      }
    }
})

export const loginThunk = (data) =>(dispatch) =>{

  axios.post('http://localhost:8000/api/v1/auth/login', data)
      .then(response => {
        dispatch(setUser(response.data))
        dispatch(setIsLogin(true));
        localStorage.setItem('token',response.data.token)
      })
      .catch(error => {
        if(error.response?.status===404){
          alert('credenciales incorrectas')
      }else{
        alert(error.response?.data.message)
      }
      });
}



export const { setUser } = userSlice.actions;

export default userSlice.reducer;