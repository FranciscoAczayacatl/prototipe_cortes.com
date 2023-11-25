/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import '../css/utility.css'
import { setIsLoading } from "../store/slices/isLoading.slice";
import { Link } from "react-router-dom";
import { UtillityDayTable } from "./UtillityDayTable";
import Image from "../utils/getImage";

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('es', options).format(new Date(dateString));
}

function recortarFecha(createdAt) {
  const fecha = new Date(createdAt);
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1; // Sumamos 1 porque getMonth() devuelve valores de 0 a 11
  const dia = fecha.getDate();

  // Formatear la fecha en el formato deseado (YYYY-MM-DD)
  const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

  return fechaFormateada;
}

export const AdminUtilitiPanel = ({id}) => {
  const { register, handleSubmit,reset } = useForm();
  const empresas_sucurales_id = id;
  const user_id =useSelector(state=>state.user.user.id);
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const [utility, setUtility]= useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const data ={
      empresas_sucursales_id:Number(empresas_sucurales_id)
    }
    axios.post(`${import.meta.env.VITE_GET_ALL_UTILITY}`, data)
    .then((res) =>setUtility(res.data?.result))
  }, [empresas_sucurales_id])
  
  const submit = async(data) => {
    data.empresas_sucursales_id = Number(empresas_sucurales_id);
    data.user_id=Number(user_id);

    dispatch(setIsLoading(true));
    await axios.post(`${import.meta.env.VITE_CREATE_UTILITY}`,data)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      if(error.response?.status===404){
        console.log(error);
    }else{
      alert(error.response?.data.message)
    }
    })
    .finally(()=> dispatch(setIsLoading(false)))
    reset();
  };
  const sortedData = utility.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div>
    <div className="box_utility">
    <div className="img"><img src={`../${Image.getImageCompany(empresa)}`} alt="" /></div>
    <div className="cja_utilidad">
    <h1 className="title">Utilidad:</h1>
    <form onSubmit={handleSubmit(submit)} >
      <div className="display_utility" >
        <div>
          <div style={{ marginTop: "1vh" }}>
            <h3 htmlFor="venta">Venta:</h3>
            <input type="text" id="venta" {...register("venta")} required/>
          </div>
          <div style={{ marginTop: "1vh" }}>
            <h3 htmlFor="costo">Costo:</h3>
            <input type="text" id="costo" {...register("costo")}  required/>
          </div>
        </div>
        
        <div>
          
          <div style={{ marginTop: "1vh" }}>
            <h3 htmlFor="ordinarios">Ordinarios:</h3>
            <input type="text" id="ordinarios" {...register("ordinarios")} required />
          </div>
          <div style={{ marginTop: "1vh" }}>
            <h3 htmlFor="provicion">Provicion:</h3>
            <input type="text" id="provicion" {...register("provicion")} required  />
          </div>
          <div style={{ marginTop: "1vh" }}>
            <h3 htmlFor="tb">TB:</h3>
            <input type="text" id="tb" {...register("tb")} required />
          </div>
        </div>
      </div>
      <div className="container_btn_submit_utility">
        <button className="btn_submit_utility">
          <i className="fa-solid fa-upload fa-2x"></i>
        </button>
      </div>
    </form>
    </div>

  </div>
  <div className="box_utility_tables">
  <div className="box_datos_utility">
    {
      sortedData.map(item =>(
        <Link key={item.id} to={`/utility_day/${recortarFecha(item.createdAt)}/${item.id}/${item.empresas_sucurales_id}/${item.fechas_utilidad_id}`} style={{textDecoration: 'none'}}>
          <div className="table_utility">
            <div className="table_date_utility">
              <h4 style={{color:'black'}}>{formatDate(item.createdAt)}</h4>
            </div>
            <UtillityDayTable fechas_utilidad_id={item.fechas_utilidad_id} empresas_sucurales_id={item.empresas_sucurales_id}/>
          </div>
        </Link>
      ))
    }
  </div>
  </div>
  <Link to={`/admin/utility/${id}`} style={{textDecoration:'none'}} >
      <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
  </Link>
  </div>
  )
}
