//import the User and Show models from index.js
const {User, Show} = require('../models/index')

// GET all shows
const getShows = async (req, res) => {
    try {
        const shows = await Show.findAll();
        if(shows){
            res.status(200).json(shows);
        }
    } catch (error){
        res.status(500).send(error);
    }
};

// GET one show
const getOneShow = async (req, res) => {
    try {
        // Gather the req.params.nameOfParams
        const showId = req.params.showId;
        // Use that value to find by primary key
        const show = await Show.findByPk(showId);
        if(show) {
            res.status(200).json(show);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// GET shows of a particular genre (genre in req.params) - Example: GET /genre/comedy returns all shows with a genre of "comedy".
const getShowsByGenre = async (req, res) => {
    try {
        const genre = req.params.genre;

        // Find shows by genre in the database
        const shows = await Show.findAll({
            where: {
                genre: genre
            }
        });

        // If no shows are found for the given genre, return 404 Not Found
        if (!shows || shows.length === 0) {
            res.status(404).json({ message: `No shows found for genre: ${genre}` });
        }

        // Return the found shows
        res.json(shows);
    } catch (error) {
        res.status(500).send(error);
    }
};

// PUT update rating of a show
const updateShowRating =  async (req, res) => {
    try {
        const showId = req.params.showId;
        const newRating = req.body.rating.trim();

        // Server Side Validation - validate the "rating" field
        if (!newRating) {
            return res.status(400).json({ message: 'Rating cannot be empty' });
        }
        // Find the show by Id
        const show = await Show.findByPk(showId);
        // If the show doesn't exist, return a 404 Not Found error
        if(!show) {
            res.status(404).json({ message: 'Show not found'});
        }
        // Update the rating of the show
        show.rating = newRating;
        // Save the updated show
        await show.save()
        // Return the updated show
        res.json(show);
    } catch (error) {
        res.status(500).send(error);
    }
};

// PUT update the status of a show stored with a key of available
const updateShowAvailability = async (req, res) => {
    try {
        const showId = req.params.showId;
        const newAvailability = req.body.available.trim(); // Trim whitespace from the input
        // Server Side Validation - Validate the "available" field
        if (!newAvailability) {
            return res.status(400).json({ message: 'Status cannot be empty' });
        }
        if (newAvailability.length < 5 || newAvailability.length > 25) {
            return res.status(400).json({ message: 'Status must be between 5 and 25 characters' });
        }
        const show = await Show.findByPk(showId);
        // If the show doesn't exist, return a 404 Not Found error
        if(!show) {
            res.status(404).json({message: 'Show not found' });
        }
        // Update the availability
        show.available = newAvailability;
        // Save the updated show 
        await show.save();
        // Return the updated show
        res.json(show);
    } catch (error) {
        res.status(500).send(error);
    }
};

// DELETE a show
const deleteShow = async (req, res) => {
    try {
        //show id from the request url
        const showId = req.params.showId
        //find the apprentice
        const show = await Show.findByPk(showId)
        if(show) {
            await show.destroy()
            res.status(200).send("Show has been removed!")
        } else {
            res.status(404).send("Show not found!");
        }
    } catch (error) {
        console.error(error)
        res.send(500).send(error)
    }
};

module.exports = {
    getShows,
    getOneShow,
    getShowsByGenre,
    updateShowRating,
    updateShowAvailability,
    deleteShow
};