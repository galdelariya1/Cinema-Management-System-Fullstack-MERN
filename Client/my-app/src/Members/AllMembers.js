import axios from 'axios'
import { useState, useEffect } from 'react'

import MemberComp from './Member.js'

const AllMembersComp = () => {
  
  const [members, setMembers] = useState([])

  useEffect( () => 
  {
    axios.get("http://localhost:8000/api/members")
    .then(members => setMembers(members.data.map(member => member._id)))
  },[])

  const deleteMember = (memberId) => {

    let allMembers = [...members];

    let newAllMembers = allMembers.filter(x => x !== memberId)

    setMembers(newAllMembers);
  }

  return (
    <div>
        
        {
          members.map((item, index) => {
            return <MemberComp key={index} id={item}
                    callback = {data => deleteMember(data)} />
          })
        }

    </div>
  );
}

export default AllMembersComp;
