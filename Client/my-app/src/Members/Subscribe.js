import { useState, useEffect } from 'react'
import axios from 'axios';

const SubscribeComp = (props) => {

  const [movies, setMovies] = useState([])
  const [movieToSubscribe, setMovieToSubscribe] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8000/api/movies/forsubscribe")
    .then(moviesList => setMovies(moviesList.data))
  }, [])

  const subscribe = () => {

    if (movieToSubscribe && date) {

      let movieForName = movies.find(movie => movie.id == movieToSubscribe)

      axios.put("http://localhost:8000/api/members/newmovie/" + props.member._id,
                {MovieId : movieToSubscribe, MovieName : movieForName.name, Date : date})
      .then(moviesList => {
        props.callbackSubscribe(moviesList)
        axios.put("http://localhost:8000/api/movies/newsubscription/" + movieToSubscribe,
                {MemberId : props.member._id, MemberName : props.member.Name, Date : date})
      }) 
    }

    else if (!movieToSubscribe && date){
      alert("Movie was not chosen!")
    }


  else if (movieToSubscribe && !date){
    alert("Date was not chosen!")
    }

  else {
    alert("Movie and Date were not chosen!")
    }
  }

  return (
    <div className = "subscribe">

      <h4> Add a new movie </h4>

      <select onClick={e => setMovieToSubscribe(e.target.value)}>
        {
          movies.map(item => {
            return <option key={item.id} value={item.id}>{item.name}</option>
          })
        }
      </select>

      <input type="datetime-local" onChange={e => setDate(e.target.value)} />

      <input type="button" className = "low-button" value="Subscribe" onClick={subscribe} />

    </div>
  );
}

export default SubscribeComp;
