import {  useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



function ProtectedRoutes() {

  const itslogin = useSelector(state=>state.isLogin);
  if(itslogin){
    return <Outlet/>
  }else{
    return <Navigate to={'/'}/>
  }
}

export default ProtectedRoutes