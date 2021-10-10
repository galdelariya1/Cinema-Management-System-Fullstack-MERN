import axios from 'axios'

import {useState} from 'react';

import { useHistory } from "react-router-dom";

const NewUserComp = () => 
{

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory();

  const creat = () =>
  {
    if(userName == ""){
      alert("Please Enter User Name")
      return;
    }

    if(password == ""){
      alert("Please Enter Your New Password")
      return;
    }

    axios.put("http://localhost:8000/api/users/newuser/findandadd",
              {username : userName, newpassword : password})
    .then(response => {
      alert(response.data.message) 
      history.push("/");
    }).catch(error => alert(error.response.data.message))
  }

  const cancel = () => {
    history.push("/");
  }

  return (
    <div>
      
      <h3> Creat An Account</h3> 

      <input type="text" className = "inputhBar" placeholder="User Name" onChange={e => setUserName(e.target.value)} />
      <input type="text" className = "inputhBar" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/><br/>

      <input type="button" className = "mid-button" value="Creat" onClick={creat} /> 
      <input type="button" className = "mid-button" value="Cancel" onClick={cancel} /> <br/><br/>

    </div>
  );
}

export default NewUserComp;
