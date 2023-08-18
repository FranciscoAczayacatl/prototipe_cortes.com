import { useEffect, useState } from 'react'
import '../css/datosIE.css'
import { useSelector } from 'react-redux';
import axios from 'axios';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('es', options).format(new Date(dateString));
}

export const DatosIngresoEgreso = () => {

  const [totals, setTotals] = useState([]);
  const branch =useSelector(state=>state.user.user.branch_id);

  
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
  useEffect(() => {
   updateData()
  },)
  
  const sortedData = totals.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log(sortedData);
  return (
    <div className="box_datos" >
      {
        sortedData.map((items) =>(
          <div key={items.id} className='table'>
            <div className='date'>
              <h4>{formatDate(items.createdAt)}</h4>
            </div>
            <div className='data_table'>
              <div className='entry'>
                <p>Ingreso:</p>
                <h5>{items.entry}</h5>
              </div>
              <div className='discharge'>
                <p>Egreso:</p>
                <h5>{items.discharge}</h5>
              </div>
              <div className='total'>
                <p>Total:</p>
                <h5>{items.total}</h5>
              </div>
              <div className='total'>
                <p>Result:</p>
                <h5 style={items.result == 'Utilidad'? {color:'green'}: {color:'brown'}}>{items.result}</h5>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
