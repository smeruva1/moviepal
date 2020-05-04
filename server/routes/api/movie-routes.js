const router = required('express').Router();
const {getAllMovies,saveMovie,deleteMovie} = require ('../../controllers/movie-controller');

//for GET and POST Movies /api/movies
router.route('/').get(getAllMovies).post(saveBook);


//for delete /api/books/:id

router.route('/:id').delete(deleteMovie);

module.exports = router;




