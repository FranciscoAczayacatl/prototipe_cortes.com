import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { NavUsers } from "../components/NavUsers";
import { NavAdm } from "../components/NavAdm";
import '../css/concepts.css'
import axios from "axios";
import Image from "../utils/getImage";


export const Classification = () => {
  const role = useSelector(state=>state.user.user.rol_id.nombre);
  const empresa = useSelector(state=>state.user.user.empresas_sucurales_id);
  const empresas = useSelector(state=>state.user.user.empresas_id.nombre);
  const { register, handleSubmit, reset} = useForm();
  const submit = async(data) =>{
    data.empresas_sucurales_id=empresa
    console.log(data);
    axios.post(`${import.meta.env.VITE_CREATE_CLASIFICASION}`, data)
    .catch(error =>{
      alert(error)
    });
    reset();
  }
  return (
  <div className="body_conceps">
    <div className="logotipo"><img src={Image.getImageCompany(empresas)} alt="" /></div>
    {role == "User" ? <NavUsers/> : <NavAdm/>}
    <Link to={role == "User" ? "/user" : "/adm"}><div className="button_home_concept"><i className="fa-solid fa-house fa-2xl"></i></div></Link>
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