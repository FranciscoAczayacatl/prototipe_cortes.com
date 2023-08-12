import "../css/optionsAdm.css"
import "../css/modalcreateuser.css"
import { CreateUser } from "./CreateUser"

export const OptionsAdm = () => {

  const createdUserModal=()=>{
    <CreateUser></CreateUser>
  }
  return (
    <div className="options_adm_box">
      <button type="button" ><i className="fa-solid fa-users"></i></button>
      <button type="button" onClick={()=>createdUserModal()}><i className="fa-solid fa-user-plus"></i></button>
      <button type="button"><i className="fa-solid fa-user-minus"></i></button>
      <button type="button"><i className="fa-solid fa-table-list"></i></button>
    </div>
  )
}
