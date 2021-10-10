const axios = require('axios')
const Member = require('./memberModel');

// Inserts the whole list of movies at the initialization of the server
// Pulls data from REST API

const insertAllMembers = async () => {

    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    let allMembers = resp.data;
    let dataToReturn = []

    allMembers.forEach(member => {

        let memberData = { name: member.name, email: member.email, city: member.address.city }
        this.addMember(memberData);
        dataToReturn.push(memberData)

    });

    return dataToReturn;

}

exports.getAllMembers = function () {

    return new Promise((resolve, reject) => {
        Member.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                if (!data.length) {
                    let dataToReturn = insertAllMembers();
                    resolve(dataToReturn)
                }
                else {
                    resolve(data)
                }
            }
        });
    })
}


exports.getMember = function (id) {
    return new Promise((resolve, reject) => {
        Member.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}


exports.addMember = function (obj) {
    return new Promise((resolve, reject) => {
        let member = new Member({
            Name: obj.name,
            Email: obj.email,
            City: obj.city,
            Movies : []
        });

        member.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created  with id : ' + member._id);
            }
        })
    })
}


exports.updateMember = function (id, obj) {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate(id,
            {
                Name: obj.name,
                Email: obj.email,
                City: obj.city

            }, function (err) {

            if (err) {
                reject(err);
            }
            else {
                resolve('Updated');
            }
        });
    })
}

exports.updateNewMovie = async function (id, movie) {

    let memberToUpdate = await this.getMember(id)
    var movies = memberToUpdate.Movies;
    movies.push(movie);

    Member.findByIdAndUpdate(id,
        {
            Movies: movies

        }, function (err) {

        if (err) {
            return (err);
        }
    });

    return movies;
}

exports.deleteMovies = async function(id, movieId)
{
    let member = await this.getMember(id)

    let filteredMovies = member.Movies.filter(movie => movie.MovieId !== movieId)

    Member.findByIdAndUpdate(id,
        {
            Movies : filteredMovies
        
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


exports.deleteMember = async function (id) {
    
    let memberToDelete = await this.getMember(id)
    let movies = memberToDelete.Movies;

    Member.findByIdAndDelete(id, function (err) {

        if (err) {
            return(err);
        }
    })

    return movies;
}