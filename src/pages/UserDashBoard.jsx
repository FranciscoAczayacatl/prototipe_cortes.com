import { DatosIngresoEgreso } from "../components/DatosIngresoEgreso"
import { NavUsers } from "../components/NavUsers"
import { OptionsUsers } from "../components/OptionsUsers"




const UserDashBoard = () => {
  return (
    <>
      <NavUsers></NavUsers>
      <OptionsUsers></OptionsUsers>
      <DatosIngresoEgreso></DatosIngresoEgreso>
    </>
  )
}

export default UserDashBoard
