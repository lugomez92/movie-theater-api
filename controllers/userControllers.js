//import the User and Show models from index.js
const {User, Show} = require('../models/index')

// GET all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if(users){
            res.status(200).json(users);
        }
    } catch (error){
        res.status(500).send(error);
    }
};

// GET one user
const getOneUser = async (req, res) => {
    try {
        // Gather the req.params.nameOfParams
        const userId = req.params.userId;
        // Use that value to find by primary key
        const user = await User.findByPk(userId);
        if(user) {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// GET all shows watched by a user (user id in req.params)
const getShowsWatched = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        const watchedShows = await user.getShows();
        if(watchedShows){
            res.status(200).json(watchedShows);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// PUT update and add a show if a user has watched it
const addShowToWatched = async (req, res) => {
    try {
        const userId = req.params.userId;
        const showId = req.params.showId;
        const user = await User.findByPk(userId);
        const show = await Show.findByPk(showId);
        const AddShow = await user.addShow(show);
        if (AddShow) {
            res.status(200).send(`The show: ${show} has been added to ${user}'s list!`);
        } 
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    getUsers,
    getOneUser,
    getShowsWatched,
    addShowToWatched   
}