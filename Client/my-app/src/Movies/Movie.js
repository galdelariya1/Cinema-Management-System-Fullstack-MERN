import store from 'store';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

import { useState, useEffect, useCallback } from 'react';


const MovieComp = (props) => {

  const [id, setId] = useState(props.id)
  const [movie, setMovie] = useState({})
  const [subscriptions, setSubscriptions] = useState([])
  const [subscriptionsHeader, setSubscribtionsHeader] = useState(null)
  const [editButton, setEditButton] = useState(null)
  const [deleteButton, setDeleteButton] = useState(null)
  const [memberPermission, setMemberPermission] = useState(false)

  let history = useHistory();

  useEffect(() => {

    if (store.get('permissions')['Delete_Movies']) {
      setDeleteButton(<input type="button" className="low-button" value="Delete" onClick={deleteMovie} />)
    }
    if (store.get('permissions')['Update_Movies']) {
      setEditButton(<input type="button" className="low-button" value="Edit" onClick={editMovie} />)
    }
    if (store.get('permissions')['View_Subscriptions']) {
      setMemberPermission(true)
    }
  }, [])


  useEffect(() => {

    setId(props.id)

    axios.get("http://localhost:8000/api/movies/" + props.id)
    .then(movie => {
      let movieData = {...movie.data};
      movieData.stringGenres = movie.data.Genres.toString();
      movieData.Premiered = movie.data.Premiered.slice(0, 4);
      setMovie(movieData);
      setSubscriptions(movie.data.Members)
      if (movieData.Members.length !== 0) {setSubscribtionsHeader(<h4> Subscriptions </h4>)}
    })

  }, [])

  const editMovie = () => {
    history.push("/MainPage/Movies/EditMovie/" + id);
  }

  const deleteMovie = () => {

    axios.delete("http://localhost:8000/api/movies/" + id)
    .then( membersToDelete => {
      //Members Deletion Logic
      console.log(membersToDelete.data)
      for(let member of membersToDelete.data){
        axios.put("http://localhost:8000/api/members/moviedeletion/" + member.MemberId, {movieId : id})
      }
    })

    alert('Deleted');
    props.callback(id)
  }

  return (
    <div className="item">

      <h3>{movie.Name} , {movie.Premiered} </h3>

      <h4> Genres: {movie.stringGenres} </h4>

      <img width="250" height="250" src={movie.Image} />

      {subscriptionsHeader}

      <ul className="MovieList">
        {
          subscriptions.map(item => {

            if (memberPermission) {
              return <li key={item._id}>
                <Link className="Link" to={`/MainPage/Subscriptions/SingleMember/${item.MemberId}`}>{item.MemberName}</Link>
                , {item.Date} </li>
            }
            else {
              return <li key={item._id}> {item.MemberName + " "} , {" " + item.Date} </li>
            }

          })
        }

      </ul>

      {editButton}
      {deleteButton}

    </div>
  );
}

export default MovieComp;

