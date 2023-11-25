/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../css/userdasboard.css'
import { AdminOperacionEgresoIngreso } from "./AdminOperacionEgresoIngreso";
import { AdminDatosIngresos } from "./AdminDatosIngresos";
import { useSelector } from "react-redux";
import Image from "../utils/getImage";
import { NavAdm } from "./NavAdm";

function Menu({falseMenu, id}) {
  return (
    <div className="menu" >
      <button onClick={()=>{falseMenu()}} className='buton_exit'>X</button>
      <div className='box_menu_select'>
        <Link className='concepto_box' to={`/admin/ingresoegreso/addconcept/${id}`}>
          <h2>Agregar concepto</h2>
        </Link>
        <Link className='concepto_box' to={`/admin/ingresoegreso/addcentercost/${id}`}>
          <h2>Agregar centro de costo</h2>
        </Link>
        <Link className='concepto_box' to={`/admin/ingresoegreso/adddepartament/${id}`}>
          <h2>Agregar departamento</h2>
        </Link>
        <Link className='concepto_box' to={`/admin/ingresoegreso/addclassification/${id}`}>
          <h2>Agregar clasificasion</h2>
        </Link>
      </div>
    </div>
  );
}  

export const AdminOperacionIE = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const {id} = useParams();
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const falseMenu =()=>{
    setMenuVisible(!menuVisible);
  }
  return (
    <div className="box_dashboard_user">
    <div className="img"><img src={`../${Image.getImageCompany(empresa)}`} alt="" /></div>
    <NavAdm></NavAdm>
    
    <AdminOperacionEgresoIngreso id={id}></AdminOperacionEgresoIngreso>
    <AdminDatosIngresos id={id}></AdminDatosIngresos>
    <Link to={`../adminingresoegreso/${id}`} style={{textDecoration:'none'}} >
        <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
      <div className='container_bnt_options_nav'>
      <div className='btn_options_nav ' onClick={toggleMenu}><i className="fa-solid fa-list fa-lg"></i></div>
      
    </div>
    {menuVisible && <Menu falseMenu={falseMenu} id={id}/>}
  </div>
  )
}
