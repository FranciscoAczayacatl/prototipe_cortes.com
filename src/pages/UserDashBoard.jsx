
import { NavUsers } from "../components/NavUsers"

import '../css/userdasboard.css'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Image from "../utils/getImage"
// import { OptionsUsers } from "../components/OptionsUsers"




const UserDashBoard = () => {
  // const updateDataIngresoEgreso = useRef();
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const sucursal = useSelector(state=>state.user.user.sucursales_id.nombre);
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
    </div>
  )
}

export default UserDashBoard
