import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { NavAdm } from "../components/NavAdm";
import '../css/concepts.css'
import axios from "axios";
import Image from "../utils/getImage";

export const AdminClassification = () => {
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const {id} = useParams()
  const { register, handleSubmit, reset} = useForm();
  const submit = async(data) =>{
    data.empresas_sucurales_id=id
    console.log(data);
    axios.post(`${import.meta.env.VITE_CREATE_CLASIFICASION}`, data)
    .catch(error =>{
      alert(error)
    });
    reset();
  }
  return (
    <div className="body_conceps">
    <div className="logotipo"><img src={`../${Image.getImageCompany(empresa)}`} alt="" /></div>
    <NavAdm/>
    <Link to={`../admin/operacionegreso/operacion/${id}`} style={{textDecoration:'none'}} >
        <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
    </Link>
    <div className="box_concepts">
      <form onSubmit={handleSubmit(submit)} className="form_concepts" >
        <h1 htmlFor="nombre">Ingrese la clasificasion:</h1>
        <input type="text" name="nombre" id="nombre" {...register('nombre')} required  />
        <button>Submit</button>
      </form>
    </div>


  </div>
  )
}
