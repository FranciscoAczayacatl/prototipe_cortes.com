import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setRoleThunk } from "../store/slices/role.slice";


function ProtectedRoutes() {

  const itslogin = useSelector(state=>state.isLogin);
  const dispatch = useDispatch();
  if(itslogin){
    dispatch(setRoleThunk());
    return <Outlet/>
  }else{
    return <Navigate to={'/'}/>
  }
}

export default ProtectedRoutes