import { Link } from "react-router-dom"
import { NavUsers } from "../components/NavUsers"
import { useSelector } from "react-redux";

import '../css/utility.css'
import { UtilitiPanel } from "../components/UtilitiPanel";


export const Utility = () => {

  const role = useSelector(state=>state.user.user.rol_id.nombre);
  return (
    <div>

      <NavUsers></NavUsers>
      <Link to={role == "User" ? "/user" : "/adm"} style={{textDecoration:'none'}} >
        <div className="btn_home_utility" ><i className="fa-solid fa-house"></i></div>
      </Link>
      <UtilitiPanel/>
    </div>
  )
}
