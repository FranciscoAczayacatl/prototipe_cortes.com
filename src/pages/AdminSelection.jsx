import { Link, useParams } from "react-router-dom"
import { NavUsers } from "../components/NavUsers"
import { useSelector } from "react-redux";
import Image from "../utils/getImage";

export const AdminSelection = () => {
  const role = useSelector(state=>state.user.user.rol_id.nombre);
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const {id} =useParams()
  return (
    <div className="box_dashboard_user">
    <div className="img"><img src={Image.getImageCompany(empresa)} alt="" /></div>
    <NavUsers></NavUsers>
    <div className="box_panel_user">
      <Link  to={`/adminingresoegreso/${id}`} style={{textDecoration:'none'}}>
        <div className="btn_select_egreso_ingreso"><h1>Ingreso Y Egresos</h1></div>
      </Link>
      <Link  to={`/admin/utility/${id}`} style={{textDecoration:'none'}}>
        <div className="btn_select_egreso_ingreso"><h1>Utilidad</h1></div>
      </Link>
    
    </div>
    <Link to={role == "User" ? "/user" : "/adm"} style={{textDecoration:'none'}} >
          <div className="btn_home_ie" ><i className="fa-solid fa-house"></i></div>
      </Link>
  </div>
  )
}
