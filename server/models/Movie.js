const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    // saved movie id from OMDB
    movieId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String
    },
    released: {
        type: String,
        required: true,
    },
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;