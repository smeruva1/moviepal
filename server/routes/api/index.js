const router = require('express').Router();
// const movieRoutes = require('./movie-routes');

// router.use('/movies', movieRoutes);

// module.exports = router;


const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;