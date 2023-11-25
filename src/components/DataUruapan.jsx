import { useEffect, useState } from 'react'
import '../css/tablesAdmin.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('es', options).format(new Date(dateString));
}

function recortarFecha(createdAt) {
  const fecha = new Date(createdAt);
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1; // Sumamos 1 porque getMonth() devuelve valores de 0 a 11
  const dia = fecha.getDate();

  // Formatear la fecha en el formato deseado (YYYY-MM-DD)
  const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

  return fechaFormateada;
}

// eslint-disable-next-line react/prop-types
export const DataUruapan = ({closeModal}) => {
  const [totals, setTotals] = useState([]);
  const branch = useSelector(state=>state.user.user.empresas_sucurales_id);
  const empresas_sucurales_id =useSelector(state=>state.user.user.empresas_sucurales_id);
  const [utility, setUtility]= useState([]);
  const updateData = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_GET_ALL_TOTALS}`, {
        empresas_sucurales_id: branch
      });
      setTotals(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   updateData()
   const data ={
    empresas_sucursales_id:Number(empresas_sucurales_id)
  }
  axios.post(`${import.meta.env.VITE_GET_ALL_UTILITY}`, data)
  .then((res) =>setUtility(res.data?.result))
  },)
  
  const sortedData = totals.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const sortedDataUtility = utility.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log(sortedData);

  return (
    <div className='modal_show'>
    <div className='modalContent'>
      <h1>Ingresos Egresos:</h1>
      <button onClick={closeModal}>X</button>
      <div className="box_datos_adm" >
      {
        sortedData.map((items) =>(
          <Link key={items.id} className='table'  style={{textDecoration: 'none'}} to={`/tables/${items.createdAt}/${items.id}/${items.empresas_sucurales_id}`}>
            <div className='date'>
              <h4 style={{color: 'black'}}>{formatDate(items.createdAt)}</h4>
            </div>
            <div className='data_table'>
              <div className='entry'>
                <p style={{color: 'black'}}>Ingreso:</p>
                <h5>{items.entry}</h5>
              </div>
              <div className='discharge'>
                <p style={{color: 'black'}}>Egreso:</p>
                <h5>{items.discharge}</h5>
              </div>
              <div className='total'>
                <p style={{color: 'black'}}>Total:</p>
                <h5 style={items.total > 0 ? {color:'black'}: {color:'brown'}}>{items.total}</h5>
              </div>
              <div className='total'>
                <p style={{color: 'black'}}>Result:</p>
                <h5 style={items.result == 'Utilidad'? {color:'green'}: {color:'brown'}}>{items.result}</h5>
              </div>
            </div>
          </Link>
        ))
      }

      
    </div>
    <h1 style={{marginTop:'3vh'}}>Utilidad:</h1>
    {
        sortedDataUtility.map(item =>(
          <Link key={item.id} to={`/utility_day/${recortarFecha(item.createdAt)}/${item.id}/${item.empresas_sucurales_id}/${item.fechas_utilidad_id}`} style={{textDecoration: 'none'}}>
            <div className="table_utility">
              <div className="table_date_utility">
                <h4 style={{color:'black'}}>{formatDate(item.createdAt)}</h4>
              </div>
              <div style={{
                display:'flex', 
                marginTop:'2vh',
                justifyContent:'space-evenly',
                alignItems:'center'
                }}>
                <h4 style={{color:'black'}}>Ventas:</h4>
                <h4 style={{color:'green'}}>{item.ventas}</h4>
              </div>
              <div style={{
                display:'flex', 
                marginTop:'2vh',
                justifyContent:'space-evenly',
                alignItems:'center'
                }}>
                <h4 style={{color:'black'}}>Costos:</h4>
                <h4 style={{color:'brown'}}>{item.costo}</h4>
              </div>
              <div style={{
                display:'flex', 
                marginTop:'2vh',
                justifyContent:'space-evenly',
                alignItems:'center'
                }}>
                <h4 style={{color:'black'}}>Utilidad:</h4>
                <h4 style={
                  item.utilidad>0?
                  {color:'green'}:
                  {color:'brown'}}>{item.utilidad}</h4>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  </div>
  )
}
