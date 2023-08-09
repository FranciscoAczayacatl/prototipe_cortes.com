import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setRoleThunk } from "../store/slices/role.slice";

function ProtectedRoutes() {

  const itslogin = useSelector(state=>state.isLogin);
  const role_id = useSelector(state=>state.user.user?.role_id);
  
  const dispatch = useDispatch();

  const checkRole= ()=>{
   const data={
      role_id
    }
    dispatch(setRoleThunk(data))
  }


  if(itslogin){
    console.log(role_id)
    checkRole()
    return <Outlet/>
  }else{
    return <Navigate to={'/'}/>
  }
}

export default ProtectedRoutes