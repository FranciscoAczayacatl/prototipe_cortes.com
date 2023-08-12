import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import getConfig from '../../utils/getConfig';


export const roleSlice = createSlice({
    name: 'role',
    initialState: ' ',
    reducers: {
      setRole: (state, action) => {
        return action.payload;
      }
    }
})



export const setRoleThunk = () => async(dispatch) =>{

  const token = useSelector(state=>state.user.token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
  console.log(config);
  const role_id = useSelector(state=>state.user.user?.role_id);
  const data = {
    role_id: role_id
  }

  try {
    const response = await axios.post('http://localhost:8000/api/v1/roles',data ,{
      headers : config.headers,

    });
    dispatch(setRole(response.data.result))
  } catch (error) {
    if (error.response?.status === 404) {
      alert('Credenciales incorrectas');
    } else {
      alert(error.response?.data.message);
    }
  
  }

}
export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;