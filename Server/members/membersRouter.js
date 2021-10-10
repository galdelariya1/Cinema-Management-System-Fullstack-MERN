const express = require('express');
const membersBL = require('./membersBL');

const router = express.Router();


router.route('/')
    .get(async (req,resp) =>
    {
        let data = await membersBL.getAllMembers();
        return resp.json(data);
    })

router.route('/:id')
    .get(async (req,resp) =>
    {
        let data = await membersBL.getMember(req.params.id);
        return resp.json(data);
    })

router.route('/')
    .post(async (req,resp) =>
    {
        let status = await membersBL.addMember(req.body);
        return resp.json(status);
    })

router.route('/:id')
    .put(async (req,resp) =>
    {
        let status = await membersBL.updateMember(req.params.id,req.body);
        return resp.json(status);
    })

router.route('/newmovie/:id')
    .put(async (req,resp) =>
    {
        let moviesList = await membersBL.updateNewMovie(req.params.id,req.body);
        return resp.json(moviesList);
    })

router.route('/moviedeletion/:id')
    .put(async (req,resp) =>
    {
        let status = await membersBL.deleteMovies(req.params.id, req.body.movieId);
        return resp.json(status);
    })   

router.route('/:id')
    .delete(async (req,resp) =>
    {
        let moviesToDelete = await membersBL.deleteMember(req.params.id);
        return resp.json(moviesToDelete);
    })


module.exports = router;


