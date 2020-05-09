//import movie model
const axios = require('axios');
const { Movie } = require('../models');
require('dotenv').config();

module.exports = {
    async getAllMovies(req, res) {
        const movies = await Movie.find();
        return res.json(movies);
    },
    async getMovieDetails(req, res) {
        let movie = await Movie.findOne({movieId:req.params.id});
        let utellydata = await axios.get(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?country=US&source=imdb&source_id=${req.params.id}`,{headers: {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_UTELLY            
        }})
        return res.json({movie, utellydata: utellydata.data});
    },
    async saveMovie(req, res) {
        console.log(req.body);
        const savedMovie = await Movie.create(req.body);

        return res.json(savedMovie);
    },
    async deleteMovie(req, res) {
        const deletedMovie = await Movie.findOneAndRemove({ _id: req.params.id });

        if (!deletedMovie) {
            return res.status(404).json({ message: "Couldn't find movie with this id!" });
        }
        return res.json(deletedMovie);
    },
};