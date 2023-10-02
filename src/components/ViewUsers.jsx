import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import '../css/viewUsser.css'

export const ViewUsers = () => {

  const [user, getUser] = useState([]) 
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [estate, setEstate]=useState(false)

  useEffect(() => {
    axios.get('http://api.galax-sys.com/api/v1/users/')
    .then((res)=> getUser(res.data?.result))
  }, [estate])

  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
  };

    const handleDeleteUser = () => {
    if (selectedUserId !== null) {
      
      axios.delete(`http://api.galax-sys.com/api/v1/users/${selectedUserId}`)
        .then(() => {
          setEstate(true)
          alert('usuario eliminado');
          setEstate(false)
        })
        .catch((error) => {
          alert(error)
        });
    }
  };
  return (
    <>
        <div className="boxdatos">
      {user.map((usr) => (
        <div
          key={usr.id}
          className={`user-card ${usr.id === selectedUserId ? "selected" : ""}`}
          onClick={() => handleUserSelection(usr.id)}
        >
          <div className="name">
            <h3>Nombre:</h3>
            <h3>{usr.firstname} {usr.lastname}</h3>
          </div>
          <div className="email">
            <h4>Correo:</h4>
            <h4>{usr.email}</h4>
          </div>
          <p>Rol: {usr.role_id === 1 ? "administrador" : "usuario"}</p>
          <p>Sucursal: {usr.branch_id === 1 ? "uruapan" : "tingundin"}</p>
        </div>
      ))}

    </div>

<div
className={`button delete-selected-button ${selectedUserId === null ? "disabled" : ""}`}
onClick={handleDeleteUser}
>
Borrar Usuario Seleccionado
</div>
    </>
  );

}
