const express = require("express");
const Router = express.Router();
const {getUsers, getOneUser, getShowsWatched, addShowToWatched} = require('../controllers/userControllers');

//CRUD

// GET all users
Router.get('/', getUsers);
// GET one user
Router.get('/:userId', getOneUser);
// GET all shows watched by a user (user id in req.params)
Router.get('/:userId/shows', getShowsWatched);
// PUT update and add a show if a user has watched it
Router.put('/:userId/shows/:showId', addShowToWatched);

module.exports = Router;