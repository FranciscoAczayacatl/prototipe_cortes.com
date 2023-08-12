import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../store/slices/user.slice'; '../store/slices/user.slice'
import img from '../../public/cortes.jpg'
import '../css/login.css'





const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const roles = useSelector(state=>state.user.user?.role_id);
  const itslogin = useSelector(state=>state.isLogin);
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password
    };
    dispatch(loginThunk(data))
    
  }

  const loginPage=()=>{
    return (
      <div className="modal">
      <div className="card_login">
        <div className='img_cortes'>
          <img src={img} alt="" />
        </div>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <p>Email</p>
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            <br />
            <p>Password</p>
            <input type="password" value={password}  onChange={(e)=> setPassword(e.target.value)} required/>
            <br />
            <button type="submit" >Entrar</button>
          </form>
        </div>
      </div>
    </div>
    )
  }
  const role =()=>{
    console.log(roles);
    if(roles ==1){
      navigate('/adm')
    }else if(roles ==2){
      navigate('/user')
    }else{
      console.log('error');
    }
  }
  return (
  <div>
    {
      itslogin?  role(): loginPage()
    }
  </div>
  )
}

export default Login