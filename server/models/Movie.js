const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    Rating: {
        type: String,
        required: true,
    },
    Released: {
        type: String,
        required: true,
    },
    Plot: {
        type: String,
        required: true,
    },
    ImageURL: {
        type: String
    },
    Director: {
        type: String,
        required: true,
    },
    Genre: {
        type: String,
        required: true,
    },
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;