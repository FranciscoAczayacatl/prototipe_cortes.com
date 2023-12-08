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
import { EgresoIngeso } from './components/EgresoIngeso';
import { CostCenter } from './pages/CostCenter';
import { Departaments } from './pages/Departaments';
import { Classification } from './pages/Classification';
import { Utility } from './pages/Utility';
import { UtlityDay } from './pages/UtlityDay';
import { SeleccionIngresoEgreso } from './components/SeleccionIngresoEgreso';
import { SeleccionUtilidad } from './components/SeleccionUtilidad';
import { AdminSelection } from './pages/AdminSelection';
import AdminEgresoIngreso from './components/AdminEgresoIngreso';
import { AdminOperacionIE } from './components/AdminOperacionIE';
import { AdminConcepts } from './pages/AdminConcepts';
import { AdminCostCenter } from './pages/AdminCostCenter';
import { AdminDepartamens } from './pages/AdminDepartamens';
import { AdminClassification } from './pages/AdminClassification';
import { AdminSelecionUtilidad } from './components/AdminSelecionUtilidad';
import { AdminUtility } from './pages/AdminUtility';
import { SuperAdminDashBoard } from './pages/SuperAdminDashBoard';
import { SuperAdminCompani } from './pages/SuperAdminCompani';
import { SuperAdminUsers } from './pages/SuperAdminUsers';
import { SuperAdminAddUser } from './pages/SuperAdminAddUser';
import { CreateCompany } from './pages/CreateCompany';
import { SuperAdminCreateBranch } from './pages/SuperAdminCreateBranch';
import { SuperAdminBranchOperations } from './pages/SuperAdminBranchOperations';

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
          <Route path= '/sudo' element={<SuperAdminDashBoard/>}/>
          <Route path='/tables/:createdAt/:id/:empresas_sucurales_id' element={<TablesDetail/>}/>
          <Route path='/addConcept' element={<Concepst/>}/>
          <Route path='/addcentercost' element={<CostCenter/>}/>
          <Route path='/adddepartament' element={<Departaments/>}/>
          <Route path='/addclassification' element={<Classification/>}/>
          <Route path='/utility' element={<SeleccionUtilidad/>}/>
          <Route path='/ingresoegreso' element={<SeleccionIngresoEgreso/>} />
          <Route path='/operacion' element={<EgresoIngeso/>}/>
          <Route path='/operacionutility' element={<Utility/>}/>
          <Route path='/utility_day/:createdAt/:id/:empresas_sucurales_id/:fechas_utilidad_id' element={<UtlityDay/>}/>
          <Route path='/admselection/:id' element={<AdminSelection/>}/>
          <Route path='/adminingresoegreso/:id' element={<AdminEgresoIngreso/>}/>
          <Route path='/admin/operacionegreso/operacion/:id' element={<AdminOperacionIE/>}/>
          <Route path='/admin/ingresoegreso/addconcept/:id' element={<AdminConcepts/>}/>
          <Route path='/admin/ingresoegreso/addcentercost/:id' element={<AdminCostCenter/>}/>
          <Route path='/admin/ingresoegreso/adddepartament/:id' element={<AdminDepartamens/>}/>
          <Route path='/admin/ingresoegreso/addclassification/:id' element={<AdminClassification/>}/>
          <Route path='/admin/utility/:id' element={<AdminSelecionUtilidad/>}/>
          <Route path='/admin/utility/selector/:id' element={<AdminUtility/>}/>
          <Route path='/company/created' element={<CreateCompany/>}/>
          <Route path='/company/branch/created/:id' element={<SuperAdminCreateBranch/>}/>
          <Route path='/company/:id' element={<SuperAdminCompani/>}/>
          <Route path='/company/viewusers/:id/:empresa_id/:sucursal_id' element={<SuperAdminUsers/>}/>
          <Route path='/company/addusers/:empresa_id/:sucursal_id/:es_id' element={<SuperAdminAddUser/>}/>
          <Route path='/company/:empresa_id/:sucursal_id/:es_id' element={<SuperAdminBranchOperations/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
