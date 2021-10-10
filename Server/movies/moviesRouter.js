const express = require('express');
const moviesBL = require('./moviesBL');

const router = express.Router();


router.route('/')
    .get(async (req,resp) =>
    {
        let data = await moviesBL.getAllMovies();
        return resp.json(data);
    })

router.route('/forsubscribe')
    .get(async (req,resp) =>
    {
        let data = await moviesBL.getMoviesForSubscribe();
        return resp.json(data);
    })    

router.route('/:id')
    .get(async (req,resp) =>
    {
        let data = await moviesBL.getMovie(req.params.id);
        return resp.json(data);
    })

router.route('/')
    .post(async (req,resp) =>
    {
        let status = await moviesBL.addMovie(req.body.obj);
        return resp.json(status);
    })

router.route('/:id')
    .put(async (req,resp) =>
    {
        let status = await moviesBL.updateMovie(req.params.id,req.body.movie);
        return resp.json(status);
    })

router.route('/newsubscription/:id')
    .put(async (req,resp) =>
    {
        let status = await moviesBL.updateNewSubscription(req.params.id,req.body);
        return resp.json(status);
    })

router.route('/subscriptiondeletion/:id')
    .put(async (req,resp) =>
    {
        let status = await moviesBL.deleteSubscription(req.params.id, req.body.memberId);
        return resp.json(status);
    })

router.route('/:id')
    .delete(async (req,resp) =>
    {
        let membersToDelete = await moviesBL.deleteMovie(req.params.id);
        return resp.json(membersToDelete);
    })


module.exports = router;


