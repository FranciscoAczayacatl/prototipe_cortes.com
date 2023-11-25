import { Link, useParams } from "react-router-dom"


import '../css/utility.css'

import { NavAdm } from "../components/NavAdm";
import { AdminUtilitiPanel } from "../components/AdminUtilitiPanel";



export const AdminUtility = () => {
  
  const {id} = useParams()
  return (
    <div>
    <NavAdm></NavAdm>
    <Link to={`/admin/utility/selector/${id}`} style={{textDecoration:'none'}} >
      <div className="btn_home_utility" ><i className="fa-solid fa-house"></i></div>
    </Link>
    <AdminUtilitiPanel id={id}/>
    </div>
  )
}
