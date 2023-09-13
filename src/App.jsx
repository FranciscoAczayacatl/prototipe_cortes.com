import './App.css'
import ProtectedRoutes from './components/ProtectedRoutes'
import AdminDashBoard from './pages/AdminDashBoard';
import UserDashBoard from './pages/UserDashBoard';
import Login from './pages/Login'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { useSelector } from 'react-redux';
import LoadingScreen from './components/LoadingScreen';
import { TablesDetail } from './pages/TablesDetail';
import { Concepst } from './pages/Concepst';

function App() {
  const isLoading=useSelector(state=>state.isLoading);

  return (
    <>
    {isLoading &&<LoadingScreen/>}
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Login/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/adm' element={<AdminDashBoard/>}/>
          <Route path='/user' element={<UserDashBoard/>}/>
          <Route path='/tables/:createdAt/:id/:branch_id' element={<TablesDetail/>}/>
          <Route path='/addConcept' element={<Concepst/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
