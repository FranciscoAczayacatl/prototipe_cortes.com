/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom"
import { NavAdm } from "../components/NavAdm"
import "../css/superAdminBranchOperations.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../utils/getImage";

export const SuperAdminBranchOperations = () => {

  const {empresa_id,sucursal_id,es_id} = useParams();
  const [branch, setBranch] = useState([])
  const [empresa, setEmpresa ] = useState([])

  useEffect(() => {
    axios.post(`http://api.galax-sys.com/api/v1/branch/${sucursal_id}`)
    .then(res=>setBranch(res.data?.result.nombre) )
    .catch(error =>{
      alert(error);
      console.log(error);
    });
    axios.post(`http://api.galax-sys.com/api/v1/company/${empresa_id}`)
    .then((res)=>{
      setEmpresa(res.data?.result.nombre)
      
    })
    .catch(error =>{
      alert(error);
      console.log(error);
    });
  }, [sucursal_id, empresa_id])





  return (
    <>
    <NavAdm/>
    <div className="img"><img src={`../${Image.getImageCompany(empresa)}`} alt="" /></div>
    <h1 style={{textAlign:'center', backgroundColor:'deeppink', color:'white'}}>{branch}</h1>
    <div className="box_admin_suc_opt_b">
      <Link style={{textDecoration:'none'}} to={`/company/viewusers/${empresa_id}/${sucursal_id}/${es_id}`}><div className="box_suc_btn_b"><i className="fa-solid fa-users"></i><p>Users</p></div></Link> 
      <Link style={{textDecoration:'none'}} to={`/company/addusers/${empresa_id}/${sucursal_id}/${es_id}`}><div className="box_suc_btn_b"><i className="fa-solid fa-user-plus"></i>Agregar usuarios</div></Link>
      <Link style={{textDecoration:'none'}} to={``}><div className="box_suc_btn_b"><i className="fa-solid fa-user-minus"></i>Eliminar usuario</div></Link>
      <Link style={{textDecoration:'none'}} to={``}><div className="box_suc_btn_b"><i className="fa-solid fa-building-user"></i>Agregar departamento</div></Link>
      <Link style={{textDecoration:'none'}} to={``}><div className="box_suc_btn_b"><i className="fa-solid fa-network-wired"></i> Agregar rol</div></Link>
      <Link style={{textDecoration:'none'}} to={``}><div className="box_suc_btn_b"><i className="fa-solid fa-database"></i> <i className="fa-solid fa-chart-simple"></i>operaciones</div></Link>
    </div>
    <Link to={`/company/${empresa_id}`} style={{textDecoration:'none'}} >
      <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
    </>
  )
}
