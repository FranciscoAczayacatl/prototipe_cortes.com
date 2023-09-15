import { useSelector } from 'react-redux';
import img from '../../public/logocom.png'
import '../css/nav.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Menu({falseMenu}) {
  return (
    <div className="menu" >
      <button onClick={()=>{falseMenu()}} className='buton_exit'>X</button>
      <div className='box_menu_select'>
        <Link className='concepto_box' to={'/addConcept'}>
          <h2>Agregar concepto</h2>
        </Link>
      </div>
    </div>
  );
}

export const NavUsers = () => {
  const firstname = useSelector(state=>state.user.user.firstname);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const falseMenu =()=>{
    setMenuVisible(!menuVisible);
  }
  return (
    <div className="nav_container">
      <img src={img} alt="" />
      <h1>Hola {firstname}</h1>
      <div className='container_bnt_options_nav'>
        <div className='btn_options_nav ' onClick={toggleMenu}><i className="fa-solid fa-list fa-lg"></i></div>
        
      </div>
      {menuVisible && <Menu falseMenu={falseMenu} />}
    </div>
  )
}
