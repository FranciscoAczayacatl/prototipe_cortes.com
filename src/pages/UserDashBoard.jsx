
import { NavUsers } from "../components/NavUsers"

import '../css/userdasboard.css'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Image from "../utils/getImage"
import { setIsLoading } from "../store/slices/isLoading.slice"
import { setUser } from "../store/slices/user.slice"
import { setIsLogin } from "../store/slices/isLogin.slice"
// import { OptionsUsers } from "../components/OptionsUsers"




const UserDashBoard = () => {
  // const updateDataIngresoEgreso = useRef();
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const sucursal = useSelector(state=>state.user.user.sucursales_id.nombre);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setUser([]));
      dispatch(setIsLogin(false));
      navigate("/")
      dispatch(setIsLoading(false));
   }, 1000);

  };
  return (
    <div className="box_dashboard_user">
      <div className="img"><img src={Image.getImageCompany(empresa)} alt="" /></div>
      <NavUsers></NavUsers>
      <div style={{display:'flex', justifyContent:'center'}}>
        <h1 style={{ fontSize:'5vh', backgroundColor:'fuchsia', width:'30vw', textAlign:'center', marginTop:'1vh', color:'whitesmoke', borderRadius:'14px'}}>{sucursal}</h1>
      </div>
       
      <div className="box_panel_user">
        <Link  to={'/ingresoegreso'} style={{textDecoration:'none'}}>
          <div className="btn_select_egreso_ingreso"><h1>Ingreso Y Egresos</h1></div>
        </Link>
        <Link  to={'/utility'} style={{textDecoration:'none'}}>
          <div className="btn_select_egreso_ingreso"><h1>Utilidad</h1></div>
        </Link>

      </div>
      <div className='btn_loguot' onClick={()=>{handleLogout()}}>
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div >
    </div>
  )
}

export default UserDashBoard
