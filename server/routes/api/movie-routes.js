const router = require('express').Router();
const { getAllMovies, saveMovie, deleteMovie } = require('../../controllers/movie-controller');

//for GET and POST Movies /api/movies
router.route('/').get(getAllMovies).post(saveMovie);

//for delete /api/books/:id
router.route('/:id').delete(deleteMovie);

module.exports = router;




