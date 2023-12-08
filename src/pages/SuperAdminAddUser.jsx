import { Link, useParams } from "react-router-dom";
import { NavAdm } from "../components/NavAdm"
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../utils/getImage";
import { AddUser } from "../components/AddUser";


export const SuperAdminAddUser = () => {
  const {empresa_id, sucursal_id, es_id} = useParams();
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
    <div className="img"><img src={`../../${Image.getImageCompany(empresa)}`} alt="" /></div>
    <h1 style={{textAlign:'center', backgroundColor:'deeppink', color:'white'}}>{branch}</h1>
    <AddUser empresa_id={empresa_id} sucursal_id={sucursal_id} es_id={es_id}/>
    <Link to={`/company/${empresa_id}/${sucursal_id}/${es_id}`} style={{textDecoration:'none'}} >
      <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
    </Link>
    </>
  )
}
