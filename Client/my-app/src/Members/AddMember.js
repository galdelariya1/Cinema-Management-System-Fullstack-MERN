import axios from 'axios';
import {useState} from 'react';

const AddMemberComp = (props) => 
{
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState(' ')

  const save = () =>
  {
    axios.post("http://localhost:8000/api/members", {name, email, city})
    .then( status =>
        {
          console.log(status)
          alert('New Member Added');
          props.history.push("/MainPage/Subscriptions");
        })
  }

  const cancel = () =>
  {
    props.history.push("/MainPage/Subscriptions");
  }

  return (
    <div>

      <br/><br/>
      
      Name : <input type="text" className = "inputhBar" onChange={e => setName(e.target.value)} /><br/>
      Email : <input type="text" className = "inputhBar" onChange={e => setEmail(e.target.value)} /><br/>
      City : <input type="text" className = "inputhBar" onChange={e => setCity(e.target.value)} /><br/>

      <input type="button" className = "low-button" value="save" onClick={save} />
      <input type="button" className = "low-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default AddMemberComp;
