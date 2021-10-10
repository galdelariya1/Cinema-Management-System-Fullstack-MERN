const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    Name : String,
    CreatedDate : String,
    Permissions : {View_Movies : Boolean, Create_Movies : Boolean,
                   Update_Movies : Boolean, Delete_Movies : Boolean,
                   View_Subscriptions : Boolean, Create_Subscriptions : Boolean,
                   Update_Subscriptions : Boolean, Delete_Subscriptions : Boolean},
    SessionTimeOut : Number
})

module.exports = mongoose.model('users',UserSchema);

