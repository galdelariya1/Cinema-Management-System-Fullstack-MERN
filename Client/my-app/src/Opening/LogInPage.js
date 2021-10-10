
import axios from 'axios';
import store from 'store';
import {useState} from 'react';

import {Link, useHistory} from 'react-router-dom'

const LogInPageComp = () => 
{

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory();

  const login = (e) =>
  {

    e.preventDefault();

    if(password == ""){
      alert("Please Enter Password")
      return;
    }

    if(username == ""){
      alert("Please Enter User Name")
      return;
    }

    axios.post("http://localhost:8000/api/users/login", {username , password})
    .then(response => {
      sessionStorage["name"] = response.data.name;
      store.set('sysAdmin', response.data.sysAdmin)
      store.set('permissions', response.data.permissions)
      history.push(`/MainPage`)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  return (
    <div className = "login">
      
      <h2> Log In Page</h2> 

      <form onSubmit={e => login(e)}>

          <input type="text" className = "inputhBar" placeholder="User Name"
                       onChange={e => setUsername(e.target.value)} /><br/>
          <input type="text" className = "inputhBar" placeholder="Password" 
                      onChange={e => setPassword(e.target.value)} /><br/>

          <input type="submit" value="Login" />

      </form> <br/>

      <h4> New User? </h4> 
      <Link to={"/NewUser"}>Creat Your Password</Link>

    </div>
  );
}

export default LogInPageComp;
