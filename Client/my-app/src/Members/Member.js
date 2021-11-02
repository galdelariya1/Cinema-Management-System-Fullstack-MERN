import store from 'store';
import SubscribeComp from './Subscribe'
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

import { useState, useEffect } from 'react'

const MemberComp = (props) => {

  const [id, setId] = useState(props.id)
  const [member, setMember] = useState({})
  const [toSubscribe, setToSubscribe] = useState(true)
  const [subscribeComp, setSubscribeComp] = useState(null)
  const [moviesSubscribed, setMoviesSubscribed] = useState([])
  const [moviesHeader, setMoviesHeader] = useState(null)
  const [editButton, setEditButton] = useState(null)
  const [deleteButton, setDeleteButton] = useState(null)
  const [moviePermission, setMoviePermission] = useState(false)

  let history = useHistory();

  useEffect(() => {

    if (store.get('permissions')['Delete_Subscriptions']) {
      setDeleteButton(<input type="button" className="low-button" value="Delete" onClick={deleteMember} />)
    }
    if (store.get('permissions')['Update_Subscriptions']) {
      setEditButton(<input type="button" className="low-button" value="Edit" onClick={editMember} />)
    }
    if (store.get('permissions')['View_Movies']) {
      setMoviePermission(true)
    }

  }, [])
  
  useEffect(() => {

    setId(props.id)

    axios.get("http://localhost:8000/api/members/" + props.id)
    .then(member => {
      setMember(member.data)
      setMoviesSubscribed(member.data.Movies)
    })

  }, [props])

  useEffect(() => {

    if (moviesSubscribed.length !== 0) {
      if (moviePermission) {
        setMoviesHeader(<h4> Movies List </h4>)
      }
    }
  }, [moviesSubscribed])

  const newSubscribe = moviesList => setMoviesSubscribed(moviesList.data)

  const editMember = () => {
    history.push("/MainPage/Subscriptions/EditMember/" + props.id);
  }

  const deleteMember = () => {

    axios.delete("http://localhost:8000/api/members/" + id)
    .then( moviesToDelete => {
      //Movies Deletion Logic
      for(let movie of moviesToDelete.data){
        axios.put("http://localhost:8000/api/movies/subscriptiondeletion/" + movie.MovieId, {memberId : id})
      }
    })

    alert('Deleted');
    props.callback(id)
  }

  const subscribe = () => {
    setToSubscribe(!toSubscribe)

    if (toSubscribe) {
      setSubscribeComp(<SubscribeComp member={member}
        callbackSubscribe={moviesList => newSubscribe(moviesList)} />)
    }

    else {
      setSubscribeComp(null)
    }
  }


  return (
    <div className="item">

      <h3>{member.Name} </h3>

      Email : {member.Email} <br />
      City : {member.City}

      {editButton}
      {deleteButton}

      {moviesHeader}

      <ul>
        {
          moviesSubscribed.map(item => {
            if (moviePermission) {
              return <li key={item._id}>
                <Link to={`/MainPage/Movies/SingleMovie/${item.MovieId}`}>{item.MovieName}</Link>
                , {item.Date} </li>
            }
            else {
              return <li key={item._id}> {item.MovieName + " "},{" " + item.Date} </li>
            }
          })
        }
      </ul>

      <input type="button" className="low-button" value="Subscribe to new movie" onClick={subscribe} />

      {subscribeComp}

    </div>
  );
}

export default MemberComp;

