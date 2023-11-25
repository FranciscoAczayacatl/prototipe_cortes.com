import { Link, useParams } from "react-router-dom"
import { NavUsers } from "./NavUsers"
import { useSelector } from "react-redux";
import Image from "../utils/getImage";


const AdminEgresoIngreso = () => {
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const {id} = useParams()
  return (
    <div className="box_dashboard_user">
    <div className="img"><img src={Image.getImageCompany(empresa)} alt="" /></div>
    <NavUsers></NavUsers>
    <h1 style={{textAlign:'center', marginTop:'1vh'}}>INGRESOS Y EGRESOS: </h1>
    <div className="box_panel_user">
      <Link  to={`../admin/operacionegreso/operacion/${id}`} style={{textDecoration:'none'}}>
        <div className="btn_select_egreso_ingreso"><h1>Operacion</h1></div>
      </Link>
      {/* <Link  to={'/utility'} style={{textDecoration:'none'}}>
        <div className="btn_select_egreso_ingreso"><h1>Busqueda</h1></div>
      </Link> */}
      <Link to={`../admselection/${id}`} style={{textDecoration:'none'}} >
          <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
    </div>
  </div>
  )
}

export default AdminEgresoIngreso