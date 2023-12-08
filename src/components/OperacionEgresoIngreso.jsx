import { setIsLoading } from "../store/slices/isLoading.slice";


import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import '../css/operacionEgresoIngreso.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


export const OperacionEgresoIngreso = () => {

  const { register, handleSubmit, reset, control } = useForm();
  const empresas_sucurales_id =useSelector(state=>state.user.user.empresas_sucurales_id);
  const user_id =useSelector(state=>state.user.user.id);
  const dispatch = useDispatch();
  const [concept, setConcept]= useState([]);
  const [centerCost, setcenterCost] = useState([]);
  const [departaments, setDepartaments] = useState([]);
  const [classificasion,  setclasificacion] = useState([]);

  useEffect(() => {

    axios.post(`${import.meta.env.VITE_GET_ALL_CONCEPTS}`,{
      empresas_sucurales_id: empresas_sucurales_id
    }).
    then((res) => setConcept(res.data?.result))
    .catch(error=>{
      console.log(error);
    });

    axios.post(`${import.meta.env.VITE_GET_ALL_COST_CENTER}`,{
      empresas_sucurales_id: empresas_sucurales_id
    }).
    then((res) => setcenterCost(res.data?.result))
    .catch(error=>{
      console.log(error);
    });
    axios.post(`${import.meta.env.VITE_GET_ALL_DEPARTAMENT}`,{
      empresas_sucurales_id: empresas_sucurales_id
    }).
    then((res) => setDepartaments(res.data?.result))
    .catch(error=>{
      console.log(error);
    });
    axios.post(`${import.meta.env.VITE_GET_ALL_CLASIFICASION}`,{
      empresas_sucurales_id: empresas_sucurales_id
    }).
    then((res) => setclasificacion(res.data?.result))
    .catch(error=>{
      console.log(error);
    });
  }, [empresas_sucurales_id])
  

  const submit = async(data) =>{
    data.empresas_sucurales_id =  empresas_sucurales_id
    data.user_id = user_id


    if(data.EntryOrDischarge=='1'){

        dispatch(setIsLoading(true));
        await axios.post(`${import.meta.env.VITE_CREATE_ENTRY}`,data)
        .then(response => {
          console.log(response);
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
    }else{
        dispatch(setIsLoading(true));
        axios.post(`${import.meta.env.VITE_CREATE_DISCHARGES}`,data)
        .then(response => {
          console.log(response);
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
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Operaciones Ingreso-Egreso</h1>
      <form onSubmit={handleSubmit(submit)} >
        <div className='entry_or_discharge'>
          <Controller
                name="EntryOrDischarge"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Seleccione la operacion</option>
                    <option value="1">Ingreso</option>
                    <option value="2">Egreso</option>
                  </select>
                  )}
                /> 
        </div>
        <div className='containe_costCenter_and_all'>

          <div className='center_class_concept'>

          <Controller
              name="centro_costo_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field} style={{marginRight:'0vw'}}>
                  <option value="">Seleccione el centro de costo</option>
                  {
                    centerCost.map((item)=>(
                      <option key={item.id} value={Number(item.id)}>{item.nombre}</option>
                    ))
                  }
                </select>
                )}
              /> 
               <br />
        <div style={{marginBottom:'1vh'}}>

        <Controller
              name="concepto_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field} style={{marginRight:'1vw'}}>
                  <option value="">Seleccione el concepto</option>
                  {
                    concept.map((item)=>(
                      <option key={item.id} value={Number(item.id)}>{item.nombre}</option>
                    ))
                  }
                </select>
                )}
              /> 
              
              <Controller
              name="departamentos_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field} style={{marginRight:'0vw'}}>
                  <option value="">Seleccione el departamento</option>
                  {
                    departaments.map((item)=>(
                      <option key={item.id} value={Number(item.id)}>{item.nombre}</option>
                    ))
                  }
                </select>
                )}
              /> 
              <div style={{marginTop:'1vh'}}>
                <h3 htmlFor="total">Total:</h3>
                <input type="text" id="total" {...register('total')} />
              </div>
        </div>
        <Controller
              name="clasificasion_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field} style={{marginRight:'0vw'}}>
                  <option value="">Seleccione la clasificasion</option>
                  {
                    classificasion.map((item)=>(
                      <option key={item.id} value={Number(item.id)}>{item.nombre}</option>
                    ))
                  }
                </select>
                )}
              />  
          </div>
          <div className='text_area'> 
            <h3 htmlFor="observations">Observaciones:</h3>
        <textarea name="observations" cols="55" rows="8" {...register('observations')} required ></textarea><br />
        </div>
        </div>
        
       
        <div className='container_btn_submit_entry_discharge'>
        
          <button className='btn_submit_entry_discharge'><i className="fa-solid fa-upload fa-2x"></i></button>
        </div>
      </form>
    </div>
  )
}
