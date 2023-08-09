import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';


export const roleSlice = createSlice({
    name: 'role',
    initialState: ' ',
    reducers: {
      setRole: (state, action) => {
        return action.payload;
      }
    }
})

export const setRoleThunk = (data) =>(dispatch) =>{

  axios.get('http://localhost:8000/api/v1/roles', data, getConfig())
      .then(response => {
        console.log(response);
        dispatch(setRole(response.data.name))
        
      })
      .catch(error => {
        if(error.response?.status===404){
          alert('credenciales incorrectas')
      }else{
        alert(error.response?.data.message)
      }
      });
}
export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;