import {  useEffect, useState } from 'react'
import '../css/datosIE.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('es', options).format(new Date(dateString));
}

export const DatosIngresoEgreso = () => {

  const [totals, setTotals] = useState([]);
  const branch = useSelector(state=>state.user.user.branch_id);
  const isLoading= useSelector(state=>state.isLoading);
  
  
  // const updateData = async () => {
  //   try {
  //     const res = await axios.post('http://localhost:8000/api/v1/totals', {
  //       branch_id: branch
  //     });
  //     setTotals(res.data.result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   if (isLoading) {
  //     updateData()
  //   }else{
  //     updateData()
  //   }
   
  // },[isLoading ])

  useEffect(() => {
    const updateData = async () => {
      try {
        const res = await axios.post('http://localhost:8000/api/v1/totals', {
          branch_id: branch
        });
        setTotals(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (isLoading) {
      updateData();
    }
    updateData();
  }, [isLoading, branch]);
  
  const sortedData = totals.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="box_datos" >
      {
        sortedData.map((items) =>(
          <Link key={items.id} className='table' style={{textDecoration: 'none'}} to={`/tables/${items.createdAt}/${items.id}/${items.branch_id}`}>
            <div className='date'>
              <h4 style={{color:'black'}}>{formatDate(items.createdAt)}</h4>
            </div>
            <div className='data_table'>
              <div className='entry'>
                <p style={{color:'black'}}>Ingreso:</p>
                <h5>{items.entry}</h5>
              </div>
              <div className='discharge'>
                <p style={{color:'black'}}>Egreso:</p>
                <h5>{items.discharge}</h5>
              </div>
              <div className='total'>
                <p style={{color:'black'}}>Total:</p>
                <h5 style={items.total > 0 ? {color:'black'}: {color:'brown'}}>{items.total}</h5>
              </div>
              <div className='total'>
                <p style={{color:'black'}}>Result:</p>
                <h5 style={items.result == 'Utilidad'? {color:'green'}: {color:'brown'}}>{items.result}</h5>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}
