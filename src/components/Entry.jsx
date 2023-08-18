import { setIsLoading } from "../store/slices/isLoading.slice";
import axios from 'axios';
import '../css/options.css'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const defaultValues = {
  concepto: '',
  entry: ''
}

export const Entry = () => {
  const { register, handleSubmit, reset } = useForm();
  const branch =useSelector(state=>state.user.user.branch_id);
  const dispatch = useDispatch();

  const submitEntry = async(data) =>{
    
    
    dispatch(setIsLoading(true));
    data.branch_id =  branch
    await axios.post('http://localhost:8000/api/v1/entry/create',data)
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
    <form className="ingreso_box " onSubmit={handleSubmit(submitEntry)}>
    <h1>Ingreso:</h1>
    <h3 htmlFor="concepto">Concepto:</h3>
    <textarea name="concepto" id="concepto" cols="55" rows="2" {...register('concepto')}></textarea>
    <h3 htmlFor="entry">Total:</h3>
    <input type="text"  id="entry" {...register('entry')}/>
    <br />
    <button>Submit</button>
  </form>
  )
}
