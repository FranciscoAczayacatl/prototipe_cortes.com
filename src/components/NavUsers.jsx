import { useSelector } from 'react-redux';

import '../css/nav.css'
import { Link } from 'react-router-dom';
import Image from '../utils/getImage';




export const NavUsers = () => {
  const firstname = useSelector(state=>state.user.user.nombres);
  const apellidoMaterno = useSelector(state=>state.user.user.apellido_materno);
  const apellidoPaterno = useSelector(state=>state.user.user.apellido_paterno);
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  return (
    <div className="nav_container">
      <Link to={"/adm"} style={{textDecoration:'none', zIndex:'200'}} >
        <img src={Image.getImageCompany(empresa)} alt="" />
      </Link>
      
      <h1>Hola {firstname} {apellidoMaterno} {apellidoPaterno}</h1>

    </div>
  )
}
