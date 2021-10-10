const express = require('express');
const permissionsBL = require('./permissionsBL');

const router = express.Router();


router.route('/')
    .get(async (req,resp) =>
    {
        let data = await permissionsBL.getAllUsersPermissions();
        return resp.json(data);
    })

router.route('/:id')
    .get(async (req,resp) =>
    {
        let data = await permissionsBL.getUserPermissions(req.params.id);
        return resp.json(data);
    })

router.route('/')
    .post(async (req,resp) =>
    {
        console.log(req.body)
        let status = await permissionsBL.addUserPermissions(req.body);
        return resp.json(status);
    })

router.route('/:id')
    .put(async (req,resp) =>
    {
        let status = await permissionsBL.updateUserPermissions(req.params.id,req.body);
        return resp.json(status);
    })

router.route('/:id')
    .delete(async (req,resp) =>
    {
        let status = await permissionsBL.deleteUserPermissions(req.params.id);
        return resp.json(status);
    })


module.exports = router;


