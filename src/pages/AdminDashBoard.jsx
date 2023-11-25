import { NavAdm } from "../components/NavAdm"
// import { OptionsAdm } from "../components/OptionsAdm"
import { Totals } from "../components/Totals"
import { setIsLogin } from '../store/slices/isLogin.slice';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/user.slice';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { useDispatch, useSelector, } from 'react-redux';
import Image from "../utils/getImage";

const AdminDashBoard = () => {
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setUser([]));
      dispatch(setIsLogin(false));
      navigate("/")
      dispatch(setIsLoading(false));
   }, 1000);

  };
  return (
    <>
    <div className="img"><img src={Image.getImageCompany(empresa)} alt="" /></div>
    <NavAdm/>
    {/* <OptionsAdm/> */}
    <Totals/>
    <div className='btn_loguot' onClick={()=>{handleLogout()}}>
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div >
    </>
  )
}

export default AdminDashBoard