import img from '../../public/cortes.jpg'
import '../css/nav.css'

export const NavAdm= () => {
  return (
    <div className="nav_container" style={{display:'flex'}}>
      <img src={img} alt="" />
      <div></div>
    </div>
  )
}