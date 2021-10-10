import axios from "axios";
const moviesBL = require('./movies/moviesBL');
const membersBL = require('./members/membersBL');

const Movie = require('./movies/movieModel');
const Member = require('./members/memberModel');

async function insertAllMovies () {

    let resp = await axios.get("https://api.tvmaze.com/shows");
    let allMovies = resp.data;

    allMovies.forEach(movie => {

        let movieData = {name : movie.data().name, geners : movie.data().geners,
                       image : movie.data().image.original, premiered : movie.data().premiered}

        moviesBL.addMovie(movieData);
     });

     let dataToReturn;

     Movie.find({}, function(err,data)
     {
         if(err)
         {
             dataToReturn = err;
         }
         else
         {
             dataToReturn = data;
         }
     });

    return dataToReturn;

}


async function insertAllMembers () {

    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    let allMembers = resp.data;

    allMembers.forEach(member => {

      let memberData = {name : member.data().name, email : member.data().email, city : member.data().address.city}
      membersBL.addMember(memberData);

     });

    let dataToReturn;

    Member.find({}, function(err,data)
        {
            if(err)
            {
                dataToReturn = err;
            }
            else
            {
                dataToReturn = data;
            }
        });

    return dataToReturn;

}

export default {insertAllMovies, insertAllMembers}