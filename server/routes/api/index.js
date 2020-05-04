const router = require('express').Router();
const movieRoutes = require('./movie-routes');

router.use('/movies',movieRoutes);

module.exports = router;