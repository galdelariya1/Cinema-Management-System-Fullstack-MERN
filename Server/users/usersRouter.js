const express = require('express');
const userBL = require('./userBL');


// const jwt = require('jsonwebtoken')

// const authentication = require('../authentication')

const router = express.Router();

router.route('/')
    .get(async (req,resp) =>
    {
        // var token = req.headers['x-access-token'];
        // console.log(token)
        // let checkTest = authentication.auth(token)

        // console.log(checkTest)

        // if(checkTest.auth){
            let data = await userBL.getAllUsers();
            return resp.json(data);
        // }

        // if(checkTest.status == 401){
        //     return resp.status(401).send({auth : false, messege : "No token povided"})
        // }

        // if(checkTest.status == 500){
        //     return resp.status(401).send({auth : false, messege : "Failed to authenticate"})
        // }

        
    })

router.route('/:id')
    .get(async (req,resp) =>
    {
        let data = await userBL.getUser(req.params.id);
        return resp.json(data);
    })

router.route('/newuser/findandadd')
    .put(async (req,resp) => {    

    let status = await userBL.updateUserPassword(req.body)

    if(status === "Not Found")
        return resp.status(401).send({ auth: false, message: "User Name Does not exists" });
    if(status === "Wrong Password")
        return resp.status(401).send({ auth: false, message: "User Name Already Taken" })


    return resp.status(200).send({ auth: false, message: "Password Initialized Successfullyy" })

})

router.route('/')
    .post(async (req,resp) =>
    {
        let status = await userBL.addUser(req.body);
        return resp.json(status);
    })

router.route('/login')
    .post(async function(req,resp){    

    const username = req.body.username;
    const password = req.body.password;

    let data = await userBL.getAllUsers();

    let userData = data.find(user => user.username === username);

    if(!userData){
       return resp.status(401).send({auth : false, message : "User Name Does not exists"});
    }

    if(userData.password === password){

        // const userId = userData._id;
        // const sessionTimeOut = userData.SessionTimeOut * 60;

        // const RSA_PRIVATE_KEY = "somekey"

        // var tokenData = jwt.sign({id : userId}, RSA_PRIVATE_KEY, {expiresIn : sessionTimeOut} )

        // return resp.status(200).send({token : tokenData})

        return resp.status(200).send({permissions : userData.Permissions, name : userData.Name,
                                    sysAdmin : (userData.username == 'sysAdmin') })

    }
    else{
        return resp.status(401).send({auth : false, message : "Password Is Wrong"})
    }

})

router.route('/:id')
    .put(async (req,resp) =>
    {
        let status = await userBL.updateUser(req.params.id,req.body);
        return resp.json(status);
    })

router.route('/:id')
    .delete(async (req,resp) =>
    {
        let status = await userBL.deleteUser(req.params.id);
        return resp.json(status);
    })

module.exports = router;


