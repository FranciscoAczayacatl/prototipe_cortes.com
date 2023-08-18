import { useRef } from "react";
import { DatosIngresoEgreso } from "../components/DatosIngresoEgreso"
import { NavUsers } from "../components/NavUsers"
import { OptionsUsers } from "../components/OptionsUsers"




const UserDashBoard = () => {
  const updateDataIngresoEgreso = useRef();
  return (
    <div style={{backgroundColor:'whitesmoke'}}>
      <NavUsers></NavUsers>
      <OptionsUsers updateData={updateDataIngresoEgreso.current}></OptionsUsers>
      <DatosIngresoEgreso ref={updateDataIngresoEgreso}></DatosIngresoEgreso>
    </div>
  )
}

export default UserDashBoard
