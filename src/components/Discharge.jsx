import axios from 'axios';
import '../css/options.css'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';


const defaultValues = {
  concepto: '',
  entry: ''
}
export const Discharge = () => {
  const { register, handleSubmit, reset } = useForm();
  const branch =useSelector(state=>state.user.user.branch_id);
  const dispatch = useDispatch();


   const submitDischarge = (data) =>{
    
    dispatch(setIsLoading(true));
    data.branch_id =  branch
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
      <h3 htmlFor="concepto">Concepto:</h3>
      <textarea name="" id="concepto" cols="55" rows="2" {...register('concepto')}></textarea>
      <h3 htmlFor="entry">Total:</h3>
      <input type="text"  id="entry" {...register('entry')}/>
      <br />
      <button>Submit</button>
    </form>
  )
}
