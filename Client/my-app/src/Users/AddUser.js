import axios from 'axios';
import {useState} from 'react';

const falsePermissions = { View_Movies : false, Create_Movies : false,
                                  Update_Movies : false, Delete_Movies : false,
                                  View_Subscriptions : false, Create_Subscriptions : false,
                                  Update_Subscriptions : false, Delete_Subscriptions : false }

const AddUserComp = (props) => 
{

  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [sessionTimeOut, setSessionTimeOut] = useState('')
  const [permissions, setPermissions] = useState(falsePermissions)

  const customSubmit = async (e) =>
  {
    //Prevdet the browser from being rendered again !!
    e.preventDefault();

    let today = new Date().toISOString().slice(0, 10)

    //data shaping
    let obj = {name, userName, sessionTimeOut, createdDate : today, permissions}

    console.log(obj.permissions)

    axios.post("http://localhost:8000/api/users", obj)
    .then( () =>
        {
          alert('New User Added');
          props.history.push("/MainPage/UsersManagement");
        })
  }

  const cancel = () =>
  {
    props.history.push("/MainPage/UsersManagement");
  }

  return (
    <div>

      <form onSubmit={e => customSubmit(e)}>

          Name : <input type="text" className = "inputhBar" onChange={e => setName(e.target.value)} />
          User Name : <input type="text" className = "inputhBar" onChange={e => setUserName(e.target.value)} />
          Session Time Out (Minutes) : <input type="text" className = "inputhBar" onChange={e => setSessionTimeOut(e.target.value)} />

          <h4> Persmissions </h4> 

          {
              Object.keys(permissions).map( permis => {

              return <div>
                     {permis} <input type="checkbox" onChange={e => {
                        let newPremissions = {...permissions}
                        newPremissions[permis] = e.target.checked
                        setPermissions(newPremissions)
                      }} /> <br/>
                    </div>
          })
          
          }

          <br/>
          <input type="submit" value="save" />
      </form>

      <input type="button"  className = "mid-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default AddUserComp;
