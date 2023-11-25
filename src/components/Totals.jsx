import  { useEffect, useState } from 'react';
import '../css/totals.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from '../utils/getImage';




export const Totals = () => {
  
  
  const company = useSelector(state=>state.user.user.empresas_id.id);
  const [branchdata, setbranchdata ]= useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    
    const data ={
      empresa_id:company
    }
    
    axios.post(`${import.meta.env.VITE_GET_COMPANIES_AND_BRANCHES}`,data)
    .then((res)=>{
      setbranchdata(res.data?.result)
    })
    .catch(error => alert(error))
  }, [company, dispatch])
  



  console.log(branchdata);
  return (
    <>
    
    <div className='branches'>
      {
        branchdata.map(branche=>(
          <Link key={branche.id} className="boxBranch" to={`/admselection/${branche.id}`} >
            <img src={Image.getImageBranch(branche.branch_companie_brances.nombre)} alt="" className="zoom-image"/>
            <h1>{branche.branch_companie_brances.nombre}</h1>
          </Link>
          
        ))
      }
    </div>


    </>

  );
};