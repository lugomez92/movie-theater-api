const express = require("express");
const Router = express.Router();
const  { getShows, getOneShow, getShowsByGenre, updateShowRating, updateShowAvailability, deleteShow } = require('../controllers/showControllers')

// CRUD

// GET all shows
Router.get('/', getShows);
// GET one show
Router.get('/:showId', getOneShow);
// GET shows of a particular genre (genre in req.params) - Example: GET /genre/comedy returns all shows with a genre of "comedy".
Router.get('/genre/:genre', getShowsByGenre);
// PUT update rating of a show
Router.put('/:showId/rating', updateShowRating);
// PUT update the status of a show stored with a key of available
Router.put('/:showId/availability', updateShowAvailability);
// DELETE a show
Router.delete('/:showId', deleteShow);

module.exports = Router;