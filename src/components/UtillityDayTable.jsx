/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react"
import { useEffect } from "react"


export const UtillityDayTable = ({fechas_utilidad_id,empresas_sucurales_id}) => {

  const [day, setDay] = useState([]);

  useEffect(() => {
    const data = {
      fechas_utilidad_id:fechas_utilidad_id,
      empresas_sucursales_id:empresas_sucurales_id
    }
    axios.post(`${import.meta.env.VITE_GET_UTILITY_BY_ID}`,data)
    .then(res =>setDay(res?.data))
  }, [empresas_sucurales_id, fechas_utilidad_id])
  console.log(day);
  return (
    <div>
      <div className="box_flex_day_utility">
        <div className="box_v_d_u">
          <h4 style={{color:'black'}}>VENTAS:</h4>
        </div> 
        <div className="box_v_d_u">
          <h4 style={{color:'green'}}>{day.sumaTotalesVentas}</h4>
        </div>
        <div className="box_v_d_u">
          <h4 style={{color:'blue'}}>100.00%</h4>
        </div>
      </div>
      <div className="box_flex_day_utility">
        <div><h4 style={{color:'black'}}>COSTOS:</h4> </div>
        <div><h4 style={{color:'red'}}>{-day.sumaTotalesCostos}</h4> </div>
        <div><h4 style={{color:'blue'}}>{((day.sumaTotalesCostos/day.sumaTotalesVentas)*100).toFixed(2)}%</h4></div>
      </div>
      <div className="box_flex_day_utility">
        <div><h4 style={{color:'black'}}>TROUGPUT:</h4> </div>
        <div><h4 style={ day.sumaTotalesTrougput>0?{color:'green'}:{color:'red'}}>{day.sumaTotalesTrougput>0?day.sumaTotalesTrougput:"-"+day.sumaTotalesTrougput}</h4> </div>
        <div><h4 style={{color:'blue'}}>{((day.sumaTotalesTrougput/day.sumaTotalesVentas)*100).toFixed(2)}%</h4></div>
      </div>
      <br />
      <div className="box_flex_day_utility">
        <div><h4 style={{color:'black'}}>ORDINARIOS:</h4> </div>
        <div><h4 style={{color:'orange'}}>{day.sumaTotalesOrdinarios}</h4></div>
        <div><h4 style={{color:'blue'}}>{((day.sumaTotalesOrdinarios/day.sumaTotalesVentas)*100).toFixed(2)}%</h4></div>
         
      </div>
      <div className="box_flex_day_utility">
        <div><h4 style={{color:'black'}}>PROVICION:</h4></div>
        <div><h4 style={{color:'orange'}}>{day.sumaTotalesProvicion}</h4></div>
        <div><h4 style={{color:'blue'}}>{((day.sumaTotalesProvicion/day.sumaTotalesVentas)*100).toFixed(2)}%</h4></div>
          
      </div>
      <div className="box_flex_day_utility">
        <div><h4 style={{color:'black'}}>TB:</h4></div>
        <div><h4 style={{color:'orange'}}>{day.sumaTotalesTb}</h4></div>
        <div><h4 style={{color:'blue'}}>{((day.sumaTotalesTb/day.sumaTotalesVentas)*100).toFixed(2)}%</h4></div>
      </div>
      <div className="box_flex_day_utility">
        <div><h4 style={{color:'black'}}>GASTOS:</h4></div>
        <div><h4 style={{color:'red'}}>-{day.sumaTotalesGastos}</h4> </div>
        <div><h4 style={{color:'blue'}}>{((day.sumaTotalesGastos/day.sumaTotalesVentas)*100).toFixed(2)}%</h4></div>
         
      </div>
      <br/>
      <div className="box_flex_day_utility">
        <div><h4 style={{color:'black'}}>UTILIDAD:</h4></div>
        <div><h4 style={day.utilidad>0?{color:'green'}:{color:'red'}}>{day.utilidad>0?day.utilidad:"-"+day.utilidad}</h4></div>
        <div><h4 style={{color:'blue'}}>{((day.utilidad/day.sumaTotalesVentas)*100).toFixed(2)}%</h4></div>
          
      </div>
    </div>
    
  )
}
