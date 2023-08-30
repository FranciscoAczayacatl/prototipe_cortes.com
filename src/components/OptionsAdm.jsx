
import { useState } from 'react';
import "../css/optionsAdm.css";

import { CreateUser } from "./CreateUser";
import { ViewUsers } from "./ViewUsers";
// import { DeleteUser } from "./DeleteUser"; // Importa el componente de eliminación de usuario
// import { ViewUsers } from "./ViewUsers"; // Importa el componente para ver usuarios

export const OptionsAdm = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  
  const [showViewUsersModal, setShowViewUsersModal] = useState(false); // Estado para ver usuarios

  const openCreateUserModal = () => {
    setShowCreateUserModal(true);
  };

  const closeCreateUserModal = () => {
    setShowCreateUserModal(false);
  };

  const openViewUsersModal = () => {
    setShowViewUsersModal(true);
  };

  const closeViewUsersModal = () => {
    setShowViewUsersModal(false);
  };

  return (
    <div className="options_adm_box">
      <button type="button" onClick={openViewUsersModal}><i className="fa-solid fa-users"></i></button>
      <button type="button" onClick={openCreateUserModal}><i className="fa-solid fa-user-plus"></i></button>


      {/* Modal de creación de usuario */}
      {showCreateUserModal && (
        <div className="modal_create">
          <div className="modalContent">
            <CreateUser />
            <button onClick={closeCreateUserModal}>Cerrar</button>
          </div>
        </div>
      )}

       {showViewUsersModal && (
        <div className="modal_create">
          <div className="modalContent">
            <ViewUsers/>
            <button onClick={closeViewUsersModal}>Cerrar</button>
          </div>
        </div>
      )}



    </div>
  );
};