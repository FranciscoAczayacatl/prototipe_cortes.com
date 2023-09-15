import { DatosIngresoEgreso } from "../components/DatosIngresoEgreso"
import { NavUsers } from "../components/NavUsers"
import { OperacionEgresoIngreso } from "../components/OperacionEgresoIngreso"
import '../css/userdasboard.css'
import img from '../../public/logocom.png'
// import { OptionsUsers } from "../components/OptionsUsers"




const UserDashBoard = () => {
  // const updateDataIngresoEgreso = useRef();
  return (
    <div className="box_dashboard_user">
      <div className="img"><img src={img} alt="" /></div>
      <NavUsers></NavUsers>
      {/* <OptionsUsers ></OptionsUsers> */}
      <OperacionEgresoIngreso></OperacionEgresoIngreso>
      <DatosIngresoEgreso ></DatosIngresoEgreso>
    </div>
  )
}

export default UserDashBoard
