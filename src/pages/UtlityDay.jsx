import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../css/utilityDay.css"
import Image from "../utils/getImage";

function formatDate(dateString) {
  const options = { hour: "numeric", minute: "numeric", second: "numeric" };
  return new Intl.DateTimeFormat("es", options).format(new Date(dateString));
}
export const UtlityDay = () => {
  const { createdAt, id, empresas_sucurales_id,fechas_utilidad_id } = useParams();
  const role = useSelector(state=>state.user.user.rol_id.nombre);
  const empresa = useSelector(state=>state.user.user.empresas_id.nombre);
  const [utility, setUtility] = useState([]);
  const [allData, setAlldat] = useState([])

  useEffect(() => {
    const data = {
      fechas_utilidad_id:fechas_utilidad_id,
      empresas_sucursales_id:empresas_sucurales_id
    }

  
    axios.post(`${import.meta.env.VITE_GET_UTILITY_BY_ID}`,data)
    .then(res=>setUtility(res.data));

    axios.post(`${import.meta.env.VITE_GET_UTILITY_BY_TABLES_DETAIL}`,data)
    .then(res=>setAlldat(res.data?.result));
  }, [id,fechas_utilidad_id, empresas_sucurales_id])
  // console.log(allData);
  console.log(allData);
  return (
    <div>
      
      <div>

      <div className="img"><img src={`../../${Image.getImageCompany(empresa)}`} alt="" /></div>
      <h1 style={{textAlign:'center', color:'indigo'}}>{createdAt}</h1>
        <Link to={role == "User" ? "/user" : "/adm"} style={{textDecoration:'none'}} >
          <div className="btn_home_usr_u"><i className="fa-solid fa-house"></i></div>
        </Link>

        <div
          style={{
            display: "flex",
            gap: "4vh",
            justifyContent: "center",
            marginTop: "2vh",
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <h2>Trougput:</h2>
            <h2 style={utility?.sumaTotalesTrougput>0?{ color: "green" }:{ color: "red" }}>{utility?.sumaTotalesTrougput}</h2>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <h2>Gastos:</h2>
            <h2 style={{ color: "brown" }}>{-utility?.sumaTotalesGastos}</h2>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <h2>Utilidad:</h2>
            <h2
              style={
                utility?.utilidad >0
                  ? { color: "green" }
                  : { color: "brown" }
              }
            >
              {utility?.utilidad}
            </h2>
          </div>

        </div>
      </div>

      <div className="box_datos_tables_detail_utility">
        {
          allData.map(item => (
            <div key={item.id}className="card_datail_utility">
              <h1 style={{color:'cornflowerblue'}}>{formatDate(item.costo_utilidad_dia.createdAt)}</h1>
              <div className="parrr">
                <div className="para">
                  <div><h3>Ventas:</h3></div>
                  <div><h3 style={{color:'green'}}>{item.costo_utilidad_dia.ventas}</h3></div>
                </div>
                <div>
                  <div className="para">
                    <div><h3 >Costos:</h3></div>
                    <div><h3 style={{color:'red'}}>{-item.costo_utilidad_dia.costos}</h3></div>
                  </div>
                  <div className="para">
                    <div><h3>Trougput:</h3></div>
                    <div> <h3 style={item.costo_utilidad_dia.trougput>0?{color:'green'}:{color:'red'}}>{item.costo_utilidad_dia.trougput}</h3></div>
                  </div>
                  <div className="para">
                    <div><h3>Ordinarios:</h3></div>
                    <div><h3 style={{color:'orange'}}>{item.costo_utilidad_dia.costo_utilida_pivote.ordinarios}</h3></div>
                  </div>
                </div>
                <div className="para">
                  <div><h3>Provicion:</h3></div>
                  <div><h3 style={{color:'orange'}}>{item.costo_utilidad_dia.costo_utilida_pivote.provicion}</h3></div>
                </div>
                <div className="para">
                  <div><h3>TB:</h3></div>
                  <div><h3 style={{color:'orange'}}>{item.costo_utilidad_dia.costo_utilida_pivote.tb}</h3></div>
                </div>
                <div className="para" style={{borderBottom:'none'}}>
                  <div><h3>Gastos:</h3></div>
                  <div><h3 style={{color:'red'}}>{-item.costo_utilidad_dia.costo_utilida_pivote.gastos}</h3></div>
                  
                  
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {/* <Link to={'/operacionutility'} style={{textDecoration:'none'}} >
        <div className="btn_home_ie" ><i className="fa-solid fa-arrow-left"></i></div>
    </Link> */}
    </div>
  )
}
