import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import axios from "axios";
import { NavAdm } from "../components/NavAdm";
import { Link, useParams } from "react-router-dom";
import Image from "../utils/getImage";

export const SuperAdminCreateBranch = () => {
  const {id} = useParams()
  const { register, handleSubmit, reset} = useForm();
  const dispatch = useDispatch();
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);

  
  const bac =(sucursal)=>{
    const dates = {
      sucursal_id: Number(sucursal),
      empresa_id: Number(id)
    }
    axios.post(`${import.meta.env.VITE_CREATE_BAC}`, dates)
    .then(res=> console.log(res))
    .catch((error)=>{
      alert(error)
      console.log(error)
    })
  }
  const submit = async(data) =>{
    dispatch(setIsLoading(true));
    await axios.post(`${import.meta.env.VITE_CREATE_BRANCH}`, data)
    .then(res=>bac(res.data.result.id))
    dispatch(setIsLoading(false));
    reset();
  }
  return (
    <>
    <NavAdm/>
    <div className="img"><img src={`../${Image.getImageCompany(empresa)}`} alt="" /></div>
    <div className="body_create_company" >
      <div className="box_cretate_company" >
        <form onSubmit={handleSubmit(submit)} className="form_concepts" >
          <h1 htmlFor="name">Nueva Sucursal:</h1>
          <input type="text" name="name" id="name" {...register('name')} required  />
          <button>Submit</button>
        </form>
      </div>
    </div>

    <Link to={`/company/${id}`} style={{textDecoration:'none'}} >
      <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
    </>

  )
}
