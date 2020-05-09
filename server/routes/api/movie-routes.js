const router = require('express').Router();
const { getAllMovies, saveMovie, deleteMovie, getMovieDetails } = require('../../controllers/movie-controller');

//for GET and POST Movies /api/movies
// router.route('/').get(getAllMovies).post(saveMovie);


//for delete /api/books/:id
// router.route('/:id').delete(deleteMovie);

router.get('/', getAllMovies);
router.post('/', saveMovie);
router.delete('/:id', deleteMovie);
router.get('/details/:id',getMovieDetails);

module.exports = router;




