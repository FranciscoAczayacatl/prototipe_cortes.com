import axios from 'axios';
import '../css/options.css'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';


const defaultValues = {
  detalle: '',
  entry: ''
}
export const Discharge = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const branch =useSelector(state=>state.user.user.branch_id);
  const user_id =useSelector(state=>state.user.user.id);
  const dispatch = useDispatch();


   const submitDischarge = (data) =>{
    
    dispatch(setIsLoading(true));
    data.branch_id =  branch
    data.user_id = user_id
    axios.post('http://localhost:8000/api/v1/discharges',data)
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
    reset(defaultValues);
  }
  return (
    <form className="egreso_box" onSubmit={handleSubmit(submitDischarge)}>
    <h1>Egreso:</h1>
    <Controller
            name="clasificasion"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field}>
                <option value="">Seleccione clasificasion</option>
                <option value="venta">Venta</option>
                <option value="costo">Costo</option>
                <option value="gastos">Gastos</option>
                <option value="otros gastos">Otros Gastos</option>
              </select>
              )}
            />
      <h3 htmlFor="detalle">Detalle:</h3>
      <textarea name="detalle" id="detalle" cols="55" rows="2" {...register('detalle')}></textarea>
      <h3 htmlFor="entry">Total:</h3>
      <input type="text"  id="entry" {...register('entry')}/>
      <br />
      <button>Submit</button>
    </form>
  )
}
