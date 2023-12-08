import { Link, useParams } from "react-router-dom"
import { NavAdm } from "../components/NavAdm"
import "../css/SuperAdminCompani.css"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import Image from "../utils/getImage"


export const SuperAdminCompani = () => {
  const {id} = useParams()
  const [branchdata, setbranchdata ]= useState([]);
  const dispatch = useDispatch();
  const [empresa, setempresa] = useState([])
  useEffect(() => {
    
    const data ={
      empresa_id:id
    }
    
    axios.post(`${import.meta.env.VITE_GET_COMPANIES_AND_BRANCHES}`,data)
    .then((res)=>{
      setbranchdata(res.data?.result)
    })
    .catch(error => alert(error))

    axios.post(`http://api.galax-sys.com/api/v1/company/${id}`)
    .then((res)=>{
      setempresa(res.data?.result.nombre)
    })
  }, [id,dispatch])


  console.log(empresa);
  return (
    <>
    <NavAdm/>
    <h1></h1>
    <div className="img"><img src={Image.getImageCompany(empresa)} alt="" /></div>
    <div className="name_compani_super"><p>{empresa}</p></div>
    <div className="box_admin_suc_opt">
      <Link style={{textDecoration:'none'}} to={`/company/branch/created/${id}`}><div className="box_suc_btn"><i className="fa-solid fa-building"></i>Agregar sucursal</div></Link>
    </div>
    <div className='branchessuper'>
      {
        branchdata.map(branche=>(
          <Link key={branche.id} className="boxBranch" to={`/company/${branche.empresa_id}/${branche.sucursal_id}/${branche.id}`} >
            <img src={Image.getImageBranch(branche.branch_companie_brances.nombre)} alt="" className="zoom-image"/>
            <h1>{branche.branch_companie_brances.nombre}</h1>
          </Link>
          
        ))
      }
    </div>
    <Link to={`/sudo`} style={{textDecoration:'none'}} >
      <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
    </>
  )
}
