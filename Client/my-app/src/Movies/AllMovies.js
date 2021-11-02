import { useState, useEffect } from 'react'

import axios from 'axios';

import MovieComp from './Movie'

const AllMoviesComp = () => {

  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/api/movies")
      .then(movies => {
        setMovies(movies.data)
        setFilteredMovies(movies.data)
      })
  }, [])

  const deleteMovie = (movieId) => {

    let allMovies = [...movies];

    let newAllMovies = allMovies.filter(movie => movie._id !== movieId)

    setFilteredMovies(newAllMovies);
    setMovies(newAllMovies);
  }

  const find = (searchString) => {

    let searchStringLow = searchString.toLowerCase();

    let filtered = movies.filter((movie) => {
      return (movie.Name.toLowerCase().includes(searchStringLow))
    })

    setFilteredMovies(filtered);

  }


  return (
    <div>

      <br /><br />

      <div className="searchWrpper">
        <input type="text" className="inputhBar" placeholder="Search for a movie"
          onChange={e => find(e.target.value)} />
      </div>

      {
        filteredMovies.map(item => {
          return <MovieComp key={item._id} id={item._id}
            callback={data => deleteMovie(data)} />
        })
      }

    </div>
  );
}

export default AllMoviesComp;
