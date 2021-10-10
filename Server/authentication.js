const jwt = require('jsonwebtoken')

const RSA_PRIVATE_KEY = "somekey"

exports.auth = (token) => {

    if(!token){
        return {auth : false, status : 401}
    }

    jwt.verify(token, RSA_PRIVATE_KEY, function(err, decoded)
    {
        if(err){
            return {auth : false, message : "Faild to authenticat"}
        }
        
        return {auth : true, status : 200}

    })
}