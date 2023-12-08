import { useDispatch, useSelector } from "react-redux";
import { NavAdm } from "../components/NavAdm"
import Image from "../utils/getImage";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { setUser } from "../store/slices/user.slice";
import { setIsLogin } from "../store/slices/isLogin.slice";
import "../css/superAdmin.css"


export const SuperAdminDashBoard = () => {
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setUser([]));
      dispatch(setIsLogin(false));
      navigate("/")
      dispatch(setIsLoading(false));
   }, 1000);

  };
  useEffect(() => {
    
    axios.get(`${import.meta.env.VITE_GET_COMPANIES}`)
    .then((res) =>{
      dispatch(setIsLoading(true));
      setEmpresas(res.data.result)
    })
    .catch((error)=>{
      alert(error.response?.data.message)
    })
    .finally(()=>{
      dispatch(setIsLoading(false));
    })
  }, [dispatch])


  return (
    <>
      <NavAdm/>
      <h1 style={{
        position: 'absolute',
        left:'43vw',
        width:'15vw',
        height:'6vh',
        backgroundColor:'red',
        display:'flex', 
        justifyContent:'center',
        borderRadius:'14px',
        color:'white',
        marginTop:'1vh'
        }}>SuperAdmin</h1>
      <div className="img"><img src={`../${Image.getImageCompany(empresa)}`} alt="" /></div>
      <div className='btn_loguot' onClick={()=>{handleLogout()}}>
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div >
      <div className="box_companies">
        {
          empresas.map(compani=>(
            <Link key={compani.id} className="boxBranch" to={`/company/${compani.id}`} style={{border:'1px solid black'}}>
              <img style={{backgroundColor:'whitesmoke', }} src={`${Image.getImageCompany(compani.nombre)}`} alt="" className="zoom-image"/>
            </Link>
            
          ))
        }
      </div>
      <Link to={`/company/created`}>
        <div className="btn_add_industry">
          <i className="fa-solid fa-industry"></i>
        </div>
      </Link>
      

    </>
  )
}
