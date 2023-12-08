import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { NavAdm } from "../components/NavAdm";


export const SuperAdminUsers = () => {
  const {id,empresa_id,sucursal_id} = useParams()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = {
      empresa_id:id
    }
    axios.post('http://localhost:8000/api/v1/users/', data)
    .then(res => setUsers(res.data.result))
    .catch(error => alert(error));
  }, [id])
  
  console.log(users)
  return (
    <>
      <NavAdm />
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', width:'100vw', height:'100vh', gap:'5vh'}}>
        {
          users.map(user =>(
            <div key={user.id}>
              <h1>{user.nombres} {user.apellido_materno} {user.apellido_paterno}</h1>
              <h2>{user.email}</h2>
            </div>
          ))
        }
      </div>
      <Link to={`/company/${id}/${empresa_id}/${sucursal_id}`} style={{textDecoration:'none'}} >
      <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
    </>
  )
}
