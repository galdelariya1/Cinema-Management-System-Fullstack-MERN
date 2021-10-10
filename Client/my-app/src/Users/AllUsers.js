import axios from 'axios';
import { useState, useEffect } from 'react'

import UserComp from './User'

const AllUsersComp = () => {
  
  const [users, setUsers] = useState([])

  useEffect( () => 
  {
    axios.get("http://localhost:8000/api/users")
    .then(users => setUsers(users.data.map(user => user._id)))
    
  },[])

  const deleteUser = (id) => {

    let allUsers = [...users]

    setUsers(allUsers.filter(userId => userId !== id));
  }

  return (
    <div>
        
        {
          users.map( item => {
            return <UserComp key={item} id={item}
                    callback = {data => deleteUser(data)} />
          })
        }

    </div>
  );
}

export default AllUsersComp;
