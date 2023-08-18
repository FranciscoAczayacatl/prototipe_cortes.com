import  { useState } from 'react';
import '../css/totals.css';
import img from '../../public/uruapan.jpg'
import img2 from '../../public/tin.jpg'
import { DataUruapan } from './DataUruapan';
import { DataTinguindin } from './DataTinguindin';



export const Totals = () => {
  // Estado para controlar si se muestra el modal de Uruapan
  const [showUruapanModal, setShowUruapanModal] = useState(false);

  // Estado para controlar si se muestra el modal de Tinguindin
  const [showTinguindinModal, setShowTinguindinModal] = useState(false);

  const uruapanClick = () => {
    setShowUruapanModal(true);
  };

  const tinguindinClick = () => {
    setShowTinguindinModal(true);
  };

  // Función para cerrar ambos modales
  const closeModal = () => {
    setShowUruapanModal(false);
    setShowTinguindinModal(false);
  };

  return (
    <div className='branches'>
      <div className="boxBranch" onClick={uruapanClick} >
      <img src={img} alt="" className="zoom-image"/>
        <h1>Uruapan</h1>
        
      </div>
      <div className="boxBranch" onClick={tinguindinClick}>
      <img src={img2} alt="" className="zoom-image tin"/>
        <h1>Tinguindin</h1>
      </div>

      {showUruapanModal && (
        <DataUruapan closeModal={closeModal}/>
      )}

      {showTinguindinModal && (
       <DataTinguindin closeModal={closeModal}/>
      )}
    </div>
  );
};