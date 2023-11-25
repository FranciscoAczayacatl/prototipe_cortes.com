/* eslint-disable react/prop-types */
import { DatosIngresoEgreso } from "./DatosIngresoEgreso"
import { NavUsers } from "./NavUsers"
import { OperacionEgresoIngreso } from "./OperacionEgresoIngreso"
import '../css/userdasboard.css'
import { Link } from "react-router-dom"
import { useState } from 'react';
import { useSelector } from "react-redux"
import Image from "../utils/getImage"




function Menu({falseMenu}) {
  return (
    <div className="menu" >
      <button onClick={()=>{falseMenu()}} className='buton_exit'>X</button>
      <div className='box_menu_select'>
        <Link className='concepto_box' to={'/addConcept'}>
          <h2>Agregar concepto</h2>
        </Link>
        <Link className='concepto_box' to={'/addcentercost'}>
          <h2>Agregar centro de costo</h2>
        </Link>
        <Link className='concepto_box' to={'/adddepartament'}>
          <h2>Agregar departamento</h2>
        </Link>
        <Link className='concepto_box' to={'/addclassification'}>
          <h2>Agregar clasificasion</h2>
        </Link>
      </div>
    </div>
  );
}  

export const EgresoIngeso = () => {
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const falseMenu =()=>{
    setMenuVisible(!menuVisible);
  }

  return (
    <div className="box_dashboard_user">
      <div className="img"><img src={Image.getImageCompany(empresa)} alt="" /></div>
      <NavUsers></NavUsers>
      
      <OperacionEgresoIngreso></OperacionEgresoIngreso>
      <DatosIngresoEgreso ></DatosIngresoEgreso>
      <Link to={'/ingresoegreso'} style={{textDecoration:'none'}} >
          <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
        </Link>
        <div className='container_bnt_options_nav'>
        <div className='btn_options_nav ' onClick={toggleMenu}><i className="fa-solid fa-list fa-lg"></i></div>
        
      </div>
      {menuVisible && <Menu falseMenu={falseMenu} />}
    </div>
  )
}
