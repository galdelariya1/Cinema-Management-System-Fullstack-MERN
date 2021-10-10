const axios = require('axios')

const Movie = require('./movieModel');


// Inserts the whole list of movies at the initialization of the server
// Pulls data from REST API

const insertAllMovies = async () => {

    let resp = await axios.get("https://api.tvmaze.com/shows");
    let allMovies = resp.data;
    let dataToReturn = []

    allMovies.forEach(movie => {

        let movieData = {name : movie.name, genres : movie.genres,
                       image : movie.image.original, premiered : movie.premiered}

        this.addMovie(movieData);
        dataToReturn.push(movieData)
     });

    return dataToReturn;

}

exports.getAllMovies = function()
{
    return new Promise((resolve,reject) =>
    {
        Movie.find({}, function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                if(!data.length){
                    let dataToReturn = insertAllMovies();
                    resolve(dataToReturn)
                }
                else {
                    resolve(data)
                }
            }
        });
    })
}

exports.getMoviesForSubscribe = function()
{
    return new Promise((resolve,reject) =>
    {
        Movie.find({}, function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                let moviesList = data.map(movie => {
                    return {id : movie._id, name : movie.Name}
                })

                resolve(moviesList)
            }
        });
    })
}


exports.getMovie = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findById(id, function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        });
    })
}


exports.addMovie = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        let movie = new Movie({
            Name : obj.name,
            Genres : obj.genres,
            Image : obj.image,
            Premiered : obj.premiered,
            Members : []
        });

        movie.save(err =>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('Created  with id : ' + movie._id);
                }
            })
    })
}


exports.updateMovie = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findByIdAndUpdate(id,
        {
            Name : obj.name,
            Genres : obj.genres,
            Image : obj.image,
            Premiered : obj.premiered
        
        }, function(err)
        {

            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Updated');
            }
        });
    })
}

exports.updateNewSubscription = async function (id, member) {

    let movieToUpdate = await this.getMovie(id)
    var subscriptions = movieToUpdate.Members;
    subscriptions.push(member);

    Movie.findByIdAndUpdate(id,
        {
            Members: subscriptions

        }, function (err) {

        if (err) {
            return (err);
        }
        else {
            return ('Subscription Added')
        }
    });

}

exports.deleteSubscription = async function(id, memberId)
{
    let movie = await this.getMovie(id)

    let filteredSubscriptions = movie.Members.filter(member => member.MemberId !== memberId)

    Movie.findByIdAndUpdate(id,
        {
            Members : filteredSubscriptions
        
        }, function(err)
        {

            if(err)
            {
                return(err);
            }
            else
            {
                return('Updated');
            }
        });

}

exports.deleteMovie = async function (id) {
    
    let movieToDelete = await this.getMovie(id)
    let members = movieToDelete.Members;

    Movie.findByIdAndDelete(id, function (err) {

        if (err) {
            return(err);
        }
    })

    return members;
}

