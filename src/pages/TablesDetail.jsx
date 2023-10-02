import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../css/tableDetail.css"
import img from '../../public/logocom.png'
import * as ExcelJS from 'exceljs';

function formatDate(dateString) {
  const options = { hour: "numeric", minute: "numeric", second: "numeric" };
  return new Intl.DateTimeFormat("es", options).format(new Date(dateString));
}

export const TablesDetail = () => {
  
  const { createdAt, id, branch_id } = useParams();
  const [total, setTotal] = useState([]);
  const [entry, setEntry] = useState([]);
  const [discharge, setDischarge] = useState([]);
  const date = new Date(createdAt);
  const todayYear = date.getFullYear();
  const todayMonth = date.getMonth();
  const todayDay = date.getDate();
  const role = useSelector((state) => state.role);
  const arr = [];

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/v1/totals/table", {
        id: id,
      })
      .then((res) => {
        setTotal(res.data?.result);
      });
    axios
      .post("http://localhost:8000/api/v1/entry/getEntry", {
        todayYear: todayYear,
        todayMonth: todayMonth + 1,
        todayDay: todayDay,
        branch: branch_id,
      })
      .then((res) => {
        setEntry(res.data?.result);
      });
    axios
      .post("http://localhost:8000/api/v1/discharges/getDischargers/", {
        todayYear: todayYear,
        todayMonth: todayMonth + 1,
        todayDay: todayDay,
        branch: branch_id,
      })
      .then((res) => {
        setDischarge(res.data?.result);
      });
  }, [id, branch_id, todayDay, todayMonth, todayYear]);
  entry.forEach((i) => {
    i.discharge = "no";
    arr.push(i);
  });
  discharge.forEach((j) => {
    j.discharge = "yes";
    arr.push(j);
  });

  const sortedData = arr
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const converterData = () =>{
    console.log(sortedData);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.columns = [
      { header: 'casificasion', width: 20, },
      {header:'centro de costo', width:20},
      {header:'departamento', width:15},
      {header:'concepto', width:50}
    ];
    // Agregar los datos a la hoja de cálculo
    sortedData.forEach((item) => {
      worksheet.addRow([
        item.classification,
        item.cost_center,
        item.departament,
        item.discharge =='yes'? item.dischargeconcept.name: item.Entryconcept.name,
        //item.discharge =='yes'? item
      ]); // 
    });

    // Crear un archivo Blob
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      // Crear un enlace de descarga
      const a = document.createElement('a');
      a.href = url;
      a.download = `${todayDay}/${todayMonth}/${todayYear}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <>
      <div>
      <div className="img"><img src={img} alt="" /></div>
        <Link to={role == "User" ? "/user" : "/adm"} style={{textDecoration:'none'}} >
          <div className="btn_home_usr_u"><i className="fa-solid fa-house"></i></div>
        </Link>
        <h1 style={{ textAlign: "center", color: "indigo" }}>{`${todayDay}/${
          todayMonth + 1
        }/${todayYear}`}</h1>

        <div
          style={{
            display: "flex",
            gap: "4vh",
            justifyContent: "center",
            marginTop: "2vh",
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <h4>Ingreso:</h4>
            <p style={{ color: "green" }}>{total.entry}</p>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <h4>Egreso:</h4>
            <p style={{ color: "brown" }}>{total.discharge}</p>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <h4>Total:</h4>
            <p
              style={
                total.result == "Utilidad"
                  ? { color: "green" }
                  : { color: "brown" }
              }
            >
              {total.total}
            </p>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <h4>Resultado:</h4>
            <p
              style={
                total.result == "Utilidad"
                  ? { color: "green" }
                  : { color: "brown" }
              }
            >
              {total.result}
            </p>
          </div>
        </div>
      </div>

      <div
      style={
        {
          display: 'flex',
          flexDirection:'column'
        }
      }
      >
        <h1 
        style={{
          textAlign:'center'
        }}
        >Ingresos y Egresos:</h1>
        <div 
          style={{
            display:'grid',
            gridTemplateColumns:'repeat(3, 1fr)',
            gap: '5vh',
            margin:"2vw"
          }}
        >
        {sortedData.map((table) => (
          <div
            key={table.createdAt}
            style={
              table.discharge === "no"
                ? {
                    border: "1px solid green",
                    borderRadius:'14px',
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:'2vh'
                  }
                : {
                    border: "1px solid red",
                    borderRadius:'14px',
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:'2vh'
                  }
              
            }
          >
            <h3 style={{textAlign:'center'}}>{formatDate(table.createdAt)}</h3>
            <div
              style={{
                display: "flex",
                gap:'1vh',
                alignContent:'space-around'
              }}
            >
              <h4>clasificasion:</h4>
              <p>{table.classification}</p>
            </div>
            <div
              style={{
                display: "flex",
                gap:'1vh',
                alignContent:'space-around'
              }}
            >
              <h4>centro de costo:</h4>
              <p>{table.cost_center}</p>
            </div>
            <div
              style={{
                display: "flex",
                gap:'1vh',
                alignContent:'space-around'
              }}
            >
              <h4>departamento:</h4>
              <p>{table.departament}</p>
            </div>
            <div
              style={{
                display: "flex",
                gap:'1vh',
                alignContent:'space-around'
              }}
            >
              <h4>concepto:</h4>
              <p>{table.discharge === "no" ?table.Entryconcept?.name:table.dischargeconcept?.name}</p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1vw",
              }}
            >
              <h4>obsevaciones:</h4>
              <p>{table.observations}</p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1vw",
              }}
            >
              <h4>total:</h4>
              <p
                style={
                  table.discharge === "no"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {table.discharge === "no" ? table.total : `-${table.total}`}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1vw",
              }}
            >
              <h4>usuario:</h4>
              <p 
              style={{color:'royalblue'}}>
                {table.discharge === "no"
                  ? table.entryusers.firstname
                  : table.dischargeuser.firstname}{" "}
                {table.discharge === "no"
                  ? table.entryusers.lastname
                  : table.dischargeuser.lastname}
              </p>
            </div>
          </div>
        ))}
        </div>

        <div className="btn_exel_convertide" onClick={()=>converterData()}>
          <i className="fa-regular fa-file-excel fa-2x"></i>
        </div>
      </div>
    </>
  );
};
