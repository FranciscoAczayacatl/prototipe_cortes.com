import { DatosIngresoEgreso } from "../components/DatosIngresoEgreso"
import { NavUsers } from "../components/NavUsers"
import { OperacionEgresoIngreso } from "../components/OperacionEgresoIngreso"
// import { OptionsUsers } from "../components/OptionsUsers"




const UserDashBoard = () => {
  // const updateDataIngresoEgreso = useRef();
  return (
    <div style={{backgroundColor:'whitesmoke'}}>
      <NavUsers></NavUsers>
      {/* <OptionsUsers ></OptionsUsers> */}
      <OperacionEgresoIngreso></OperacionEgresoIngreso>
      <DatosIngresoEgreso ></DatosIngresoEgreso>
    </div>
  )
}

export default UserDashBoard
