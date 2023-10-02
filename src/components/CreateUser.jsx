import { setIsLoading } from "../store/slices/isLoading.slice";
import axios from 'axios';
import { useForm,Controller } from 'react-hook-form';
import { useDispatch} from 'react-redux';
import "../css/createusr.css"

const defaultValues = {
  nombres: '',
  apellidos: '',
  email:'',
  password:'',
  opcion2:'',
  opcion:'', 
}

export const CreateUser = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const dispatch = useDispatch();

  const handleCreate = async(dates) =>{

    const data = {
      firstname:dates.nombres,
      lastname: dates.apellidos,
      email: dates.email,
      password: dates.password,
      role_id: Number(dates.opcion2),
      branch_id: Number(dates.opcion)
    }
    console.log(data);
    dispatch(setIsLoading(true));
    
    await axios.post('http://api.galax-sys.com/api/v1/auth/register',data)
    .then(response => {
      console.log(response);
      alert('usuario creado')
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
    <form   className="form_create">
      <h1>Creacion de usuario</h1>
      <div className="form_creates_usr">
        <div className="inputs_created">
           <h3 htmlFor="nombres">Nombres:</h3>
          <input type="text"  id="nombres" {...register('nombres')} required/>
        </div>
        <div className="inputs_created">
          <h3 htmlFor="apellidos" >Apellidos:</h3>
          <input type="text"  id="apellidos" {...register('apellidos')} required/>
        </div>
      </div>
      <div className="form_creates_usr">
        <div className="inputs_created">
          <h3 htmlFor="email">Email:</h3>
          <input type="email"  id="email" {...register('email')} required/>
        </div>
        <div className="inputs_created">
          <h3 htmlFor="password">Password:</h3>
          <input type="password"  id="password" {...register('password')} required/>
        </div>
      </div>
      <div className="menu_display">
        <div>
          <h3 htmlFor="rol">Rol:</h3>
          <Controller
            name="opcion2"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field}>
                <option value="">Seleccione un rol</option>
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
              </select>
              )}
            />
        </div>
          <div>
          <h3 htmlFor="sucursal">Sucursal:</h3>
          <Controller
            name="opcion"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field}>
                <option value="">Seleccione una sucursal</option>
                <option value="1">Uruapan</option>
                <option value="2">Tinguindin</option>
              </select>
              )}
            />
          </div>
      </div>
      
        <br />
        <div className="buton" onClick={handleSubmit(handleCreate)}   role="button"
        tabIndex={0}>Submit</div>
    </form>
  )
}
