import { useForm } from "react-hook-form";
import { NavAdm } from "../components/NavAdm"
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import Image from "../utils/getImage";
import "../css/createdUser.css"


export const CreateCompany = () => {
  const { register, handleSubmit, reset} = useForm();
  const dispatch = useDispatch();
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const submit = async(data) =>{
    dispatch(setIsLoading(true));
    console.log(data);
    axios.post(`${import.meta.env.VITE_CREATE_COMPANIE}`, data)
    .then(res=>console.log(res.data))
    dispatch(setIsLoading(false));
    reset();
  }
  return (
    <>
    <NavAdm/>
    <div className="img"><img src={Image.getImageCompany(empresa)} alt="" /></div>
    <div className="body_create_company">
      <div className="box_cretate_company">
        <form onSubmit={handleSubmit(submit)} className="form_concepts" >
          <h1 htmlFor="name">Nueva Empresa:</h1>
          <input type="text" name="name" id="name" {...register('name')} required  />
          <button>Submit</button>
        </form>
      </div>
    </div>

    <Link to={`/sudo`} style={{textDecoration:'none'}} >
      <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
    </>
    
  )
}
