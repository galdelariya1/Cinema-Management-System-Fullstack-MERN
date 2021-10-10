const express = require('express');

require ('./configs/database')
const usersRouter = require('./users/usersRouter');
// const permissionsRouter = require('./permissions/permissionsRouter');
const moviesRouter = require('./movies/moviesRouter');
const membersRouter = require('./members/membersRouter');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/users', usersRouter);
// app.use('/api/permissions', permissionsRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/members', membersRouter);

app.listen(8000);