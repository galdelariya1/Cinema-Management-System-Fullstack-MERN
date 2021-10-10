
import axios from 'axios';
import {useState, useEffect} from 'react';

const EditMovieComp = (props) => 
{

  const id = props.match.params.id;
  const [name, setName] = useState("")
  const [genres, setGenres] = useState([])
  const [image, setImage] = useState("")
  const [premiered, setPremiered] = useState("")

  useEffect( () => 
  {
    axios.get("http://localhost:8000/api/movies/" + id)
    .then(movie => {
      setName(movie.data.Name)
      setGenres(movie.data.Genres)
      setImage(movie.data.Image)
      setPremiered(movie.data.Premiered)
    })

  },[])

  const update = () =>
  {
    axios.put("http://localhost:8000/api/movies/" + id, {name, genres, image, premiered})
    .then( status =>
        {
          console.log(status)
          alert('Updated');
          props.history.push("/MainPage/Movies");
        })
  }
  
  const cancel = () =>
  {
    props.history.push("/MainPage/Movies");
  }


  return (
    <div>

      <h3> Edit Movie : {name}</h3>

      Name : <input type="text" className = "inputhBar" value= {name} onChange={e => setName(e.target.value)} /><br/>
      Genres : <input type="text" className = "inputhBar" value= {genres} onChange={e => setGenres(e.target.value)} /><br/>
      Image Url : <input type="text" className = "inputhBar" value= {image} onChange={e => setImage(e.target.value)} /><br/>
      Premiered : <input type="text" className = "inputhBar" value= {premiered} onChange={e => setPremiered(e.target.value)} /><br/><br/>

      <input type="button" className = "low-button" value="update" onClick={update} />
      <input type="button" className = "low-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default EditMovieComp;

