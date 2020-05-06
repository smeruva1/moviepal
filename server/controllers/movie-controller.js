//import movie model

const { Movie } = require('../models');

module.exports = {
    async getAllMovies(req, res) {
        const movies = await Movie.find();
        return res.json(movies);
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