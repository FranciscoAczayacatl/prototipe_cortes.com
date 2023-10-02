import { setIsLoading } from "../store/slices/isLoading.slice";


import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import '../css/operacionEgresoIngreso.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


export const OperacionEgresoIngreso = () => {

  const { register, handleSubmit, reset, control } = useForm();
  const branch =useSelector(state=>state.user.user.branch_id);
  const user_id =useSelector(state=>state.user.user.id);
  const dispatch = useDispatch();
  const [concept, setConcept]= useState([]);

  useEffect(() => {
    axios.get('http://api.galax-sys.com/api/v1/concept/').
    then((res) => setConcept(res.data?.result))
  }, [])
  



  const submit = async(data) =>{
    data.branch_id =  branch
    data.user_id = user_id
    console.log(data);

    if(data.EntryOrDischarge=='1'){
        dispatch(setIsLoading(true));
        await axios.post('http://api.galax-sys.com/api/v1/entry/create',data)
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
        axios.post('http://api.galax-sys.com/api/v1/discharges',data)
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
              
              name="costCenter"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Seleccione el centro de costos</option>
                  <option value="OPERACIÓN">Operación</option>
                  <option value="ADMINISTRACÏON">Administracíon</option>
                  <option value="VENTAS">Ventas</option>

                </select>
                )}
              /> <br />
        <div style={{marginBottom:'1vh'}}>
        <Controller
              name="concept"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field} style={{marginRight:'1vw'}}>
                  <option value="">Seleccione el concepto</option>
                  {
                    concept.map((item)=>(
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                  }
                </select>
                )}
              /> 
              <Controller
              name="deapatarment"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Seleccione el departamento</option>
                  <option value="ADMINISTRACION">ADMINISTRACION</option>
                  <option value="INTENDECIA">INTENDECIA</option>
                  <option value="OPERACION">OPERACION</option>
                  <option value="LOGISTICA ">LOGISTICA</option>
                  <option value="GERENCIA SUCURSAL">GERENCIA SUC</option>
                  <option value="DIRECCION">DIRECCION</option>
                  <option value="GERENCIA OPERATIVA">GERENCIA OPERATIVA</option>
                  <option value="INFORMATICA">INFORMATICA</option>
                  <option value="CABAÑA">CABAÑA</option>
                  <option value="COMERCIAL">COMERCIAL</option>
                  <option value="EMPAQUE">EMPAQUE</option>
                </select>
                )}
              /> 
              <div style={{marginTop:'1vh'}}>
                <h3 htmlFor="entry">Total:</h3>
                <input type="text" id="entry" {...register('entry')} />
              </div>
        </div>
        <Controller
              name="classification"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Seleccione la clasificacíon</option>
                  <option value="COSTO">Costo</option>
                  <option value="GASTO">Gasto</option>
                  <option value="VENTA">Venta</option>
                  <option value="PRESTAMO">Prestamo</option>
                  <option value="ANTICIPO UTILIDADES">Anticipo de utilidades</option>
                </select>
                )}
              /> 
          </div>
          <div className='text_area'> 
            <h3 htmlFor="observaciones">Observaciones:</h3>
        <textarea name="observaciones" id="observaciones" cols="55" rows="8" {...register('observaciones')} required ></textarea><br />
        </div>
        </div>
        
       
        <div className='container_btn_submit_entry_discharge'>
        
          <button className='btn_submit_entry_discharge'><i className="fa-solid fa-upload fa-2x"></i></button>
        </div>
      </form>
    </div>
  )
}
