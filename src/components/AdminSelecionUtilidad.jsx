import { Link, useParams } from "react-router-dom"
import { NavAdm } from "./NavAdm"
import { useSelector } from "react-redux"
import Image from "../utils/getImage"

export const AdminSelecionUtilidad = () => {
  const {id} = useParams()
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  return (
    <div className="box_dashboard_user">
    <div className="img"><img src={Image.getImageCompany(empresa)} alt="" /></div>
    <NavAdm></NavAdm>
    <h1 style={{textAlign:'center', marginTop:'1vh'}}>UTILIDAD:</h1>
    <div className="box_panel_user">
      <Link  to={`../admin/utility/selector/${id}`} style={{textDecoration:'none'}}>
        <div className="btn_select_egreso_ingreso"><h1>Operacion</h1></div>
      </Link>
      {/* <Link  to={'/utility'} style={{textDecoration:'none'}}>
        <div className="btn_select_egreso_ingreso"><h1>Busqueda</h1></div>
      </Link> */}
      <Link to={`/admselection/${id}`} style={{textDecoration:'none'}} >
          <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
    </div>
  </div>
  )
}
