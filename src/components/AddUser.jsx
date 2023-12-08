/* eslint-disable no-unused-vars */
import { Controller, useForm } from "react-hook-form";
import "../css/addUser.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { useDispatch } from "react-redux";

export const AddUser = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const {empresa_id, sucursal_id, es_id} = useParams();
  const [rol, setRoles] = useState([]);
  const [sucursal, setSucursal] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {

    axios.get('http://api.galax-sys.com/api/v1/roles/')
    .then(res =>{
      setRoles(res.data?.result);
    })

    axios.post(`http://api.galax-sys.com/api/v1/branch/${sucursal_id}`).
    then(res =>{
      setSucursal(res.data?.result)
    })
        axios.post(`http://api.galax-sys.com/api/v1/company/${empresa_id}`).
    then(res =>{
      setEmpresa(res.data?.result)
    })

    axios.post(`http://api.galax-sys.com/api/v1/departaments/get`,{
      empresas_sucurales_id:es_id
    }).
    then(res =>{
      setDepartamentos(res.data?.result)
    })


  }, [sucursal_id, empresa_id, setDepartamentos, es_id])
  

  const submit = (data) =>{

    const dates ={
      empresa_id: Number(empresa_id),
      sucursal_id: Number(sucursal_id),
      empresas_sucurales_id: Number(es_id),
      nombres: data.nombres,
      apellido_materno: data.apellido_materno,
      apellido_paterno: data.apellido_paterno,
      departamento_id: Number(data.departamento_id),
      email: data.email,
      roles_id:Number(data.roles_id),
      password:data.password
    }
    dispatch(setIsLoading(true));
    axios.post(`http://api.galax-sys.com/api/v1/auth/register`, dates)
        .then(response => {
          alert(response)
        })
        .catch(error => {
          if(error.response?.status===404){
            alert('credenciales incorrectas')
          }else if(error.response?.status===400){
          alert(error.response?.data.message); 
        }
        }).finally(() => dispatch(setIsLoading(false)));
    reset()
  }
  return (
    <div className="body_create_user">
      <div className="card_create_user">
        <h1>AGREGAR USUARIO:</h1>
        <div className="card_data">
          <form onSubmit={handleSubmit(submit)} className="card_form_create_user">
            <div className="div_1">
              <div>
                <h3 htmlFor="nombres">Nombres: </h3>
                <input type="text" id="nombres"  {...register('nombres')} required/>
              </div>
              <div>
                <h3 htmlFor="apellido_materno">Apellido materno: </h3>
                <input type="text" id="apellido_materno"  {...register('apellido_materno')} required/>
              </div>
              <div>
                <h3 htmlFor="apellido_paterno">Apellido paterno: </h3>
                <input type="text" id="apellido_paterno"  {...register('apellido_paterno')} required/>
              </div>
              <div>
                <h3 htmlFor="email">Email: </h3>
                <input type="text" id="email"  {...register('email')} required/>
              </div>
              <div>
                <h3 htmlFor="password">Contraseña: </h3>
                <input type="text" id="password"  {...register('password')} required/>
              </div>
              <div>
              <h3>Roles: </h3>
              <Controller
                name="roles_id"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <select {...field} style={{marginRight:'0vw'}} required>
                    <option value="">Seleccione el rol: </option>
                    {
                      rol.map((item)=>(
                        <option key={item.id} value={Number(item.id)}>{item.nombre}</option>
                      ))
                    }
                  </select>
                  )}
                /> 
              </div>

              <div>
              <h3>Departamento: </h3>
              <Controller
                name="departamento_id"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <select {...field} style={{marginRight:'0vw'}} required>
                    <option value="">Seleccione el departamento: </option>
                    {
                      departamentos.map((item)=>(
                        <option key={item.id} value={Number(item.id)}>{item.nombre}</option>
                      ))
                    }
                  </select>
                  )}
                /> 
              </div>
            </div>

            <div className="div_2">
              <div>
                <h2>Sucursal:</h2>
                <h2>{sucursal.nombre}</h2>
              </div>
              <div>
                <h2>Empresa:</h2>
                <h2>{empresa.nombre}</h2>
              </div>
            </div>
            <button><i className="fa-regular fa-floppy-disk"></i></button>
          </form>
        </div>
      </div>
    </div>
  )
}
