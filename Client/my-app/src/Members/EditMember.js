import axios from 'axios';
import {useState, useEffect} from 'react';

const EditMemberComp = (props) => 
{

  const id = props.match.params.id
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")

  useEffect(() => {

    axios.get("http://localhost:8000/api/members/" + id)
    .then(member => {
      setName(member.data.Name)
      setEmail(member.data.Email)
      setCity(member.data.City)
    })

  }, [])

  const update = () =>
  {
    axios.put("http://localhost:8000/api/members/" + id, {name, email, city})
    .then( status =>
        {
          console.log(status)
          alert('Updated');
          props.history.push("/MainPage/Subscriptions");
        })
  }

  const cancel = () =>
  {
    props.history.push("/MainPage/Subscriptions");
  }

  return (
    <div>

      <h3> Edit Member : {props.name}</h3>

      Name : <input type="text" className = "inputhBar" value= {name} onChange={e => setName(e.target.value)} /><br/>
      Email : <input type="text" className = "inputhBar" value= {email} onChange={e => setEmail(e.target.value)} /><br/>
      City : <input type="text" className = "inputhBar" value= {city} onChange={e => setCity(e.target.value)} /><br/>
   
      <input type="button" className = "low-button" value="update" onClick={update} />
      <input type="button" className = "low-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default EditMemberComp;
