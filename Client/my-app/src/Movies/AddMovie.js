
import axios from 'axios';
import {useState} from 'react';

const AddMovieComp = (props) => 
{

  const [name, setName] = useState('')
  const [genres, setGenres] = useState('')
  const [image, setImage] = useState('')
  const [premiered, setPremiered] = useState('')

  const save = () =>
  {
    let genresArr = genres.split(',');

    let obj = {name, genres : genresArr, image, premiered};


    axios.post("http://localhost:8000/api/movies", obj)
    .then( status =>
      {
        console.log(status)
        alert('New Movie created ! ');
        props.history.push("/MainPage/Movies");
      })
  }

  const cancel = () =>
  {
    props.history.push("/MainPage/Movies");
  }

  return (
    <div>

      <br/><br/>

      Name : <input type="text" className = "inputhBar" onChange={e => setName(e.target.value)} /><br/>
      Genres : <input type="text" className = "inputhBar" onChange={e => setGenres(e.target.value)} /><br/>
      Image Url : <input type="text" className = "inputhBar" onChange={e => setImage(e.target.value)} /><br/>
      Premiered : <input type="text" className = "inputhBar" onChange={e => setPremiered(e.target.value)} /><br/><br/>

      <input type="button" className = "low-button" value="save" onClick={save} />
      <input type="button" className = "low-button" value="cancel" onClick={cancel} />

    </div>
  );
}

export default AddMovieComp;
