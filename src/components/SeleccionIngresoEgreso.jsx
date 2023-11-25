import { Link } from "react-router-dom"
import { NavUsers } from "./NavUsers"
import { useSelector } from "react-redux";
import Image from "../utils/getImage";


export const SeleccionIngresoEgreso = () => {
  const role = useSelector(state=>state.user.user.rol_id.nombre);
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  return (
    <div className="box_dashboard_user">
    <div className="img"><img src={Image.getImageCompany(empresa)} alt="" /></div>
    <NavUsers></NavUsers>
    <h1 style={{textAlign:'center', marginTop:'1vh'}}>INGRESOS Y EGRESOS: </h1>
    <div className="box_panel_user">
      <Link  to={'../operacion'} style={{textDecoration:'none'}}>
        <div className="btn_select_egreso_ingreso"><h1>Operacion</h1></div>
      </Link>
      {/* <Link  to={'/utility'} style={{textDecoration:'none'}}>
        <div className="btn_select_egreso_ingreso"><h1>Busqueda</h1></div>
      </Link> */}
      <Link to={role == "User" ? "/user" : "/adm"} style={{textDecoration:'none'}} >
          <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
    </div>
  </div>

  )
}
