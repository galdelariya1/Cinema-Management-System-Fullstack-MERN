import axios from 'axios';
import { useHistory } from "react-router-dom";

import { useState, useEffect } from 'react'

const UserComp = (props) => {

  const id = props.id
  const [user, setUser] = useState({})
  const [permissionsString, setPermissionsString] = useState("")
  const [editButton, setEditButton] = useState(null)
  const [deleteButton, setDeleteButton] = useState(null)
  const [passwordInit , setPasswordInit] = useState(false)

  let history = useHistory();

  useEffect(() => {

    axios.get("http://localhost:8000/api/users/" + id)
    .then(user => {
      setUser(user.data)

      let selectedPermissions = []
      for(let prm in user.data.Permissions){
        if (user.data.Permissions[prm])
          selectedPermissions.push(prm)
      }
      setPermissionsString(selectedPermissions.toString())

      if (!(user.data.username === 'sysAdmin')) {
        setEditButton(<input type="button" className = "low-button" value="Edit" onClick={editUser} />);
        setDeleteButton(<input type="button" className = "low-button" value="Delete" onClick={deleteUser} />);
        setPasswordInit( <div> Password Initialized : {(user.data.password === "") ? "No" : "Yes"} </div>)
      } 
    })
  },[])

  const editUser = () => {
    history.push("/MainPage/UsersManagement/EditUser/" + id);
  }

  const deleteUser = () => {

    axios.delete("http://localhost:8000/api/users/" + id)
    .then( () => {
        props.callback(id)
        alert('Deleted');
    })
  }


  return (
    <div className="item">

        <div className = "text"> 
          Name : {user.Name} <br/> 
          User Name : {user.username} <br/>
          Session Time Out (Minutes) : {user.SessionTimeOut} <br/>
          Created Date : {user.CreatedDate} <br/>
          Permissions : {permissionsString}
          {passwordInit}
        </div>

        {editButton}
        {deleteButton}

    </div>
  );
}

export default UserComp;

