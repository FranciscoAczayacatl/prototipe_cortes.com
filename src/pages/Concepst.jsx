import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { NavUsers } from "../components/NavUsers";
import { NavAdm } from "../components/NavAdm";
import '../css/concepts.css'
import axios from "axios";
import img from '../../public/logocom.png'


export const Concepst = () => {
  const role = useSelector((state) => state.role);
  const { register, handleSubmit, reset} = useForm();
  const submit = async(data) =>{
    axios.post('http://localhost:8000/api/v1/concept/create', data);
    reset();
  }
  return (
  <div className="body_conceps">
    <div className="logotipo"><img src={img} alt="" /></div>
    {role == "User" ? <NavUsers/> : <NavAdm/>}
    <Link to={role == "User" ? "/user" : "/adm"}><div className="button_home_concept"><i className="fa-solid fa-house fa-2xl"></i></div></Link>
    <div className="box_concepts">
      <form onSubmit={handleSubmit(submit)} className="form_concepts" >
        <h1 htmlFor="concept">Ingrese el concepto:</h1>
        <input type="text" name="concept" id="concept" {...register('concept')} required  />
        <button>Submit</button>
      </form>
    </div>


  </div>
  )
}
