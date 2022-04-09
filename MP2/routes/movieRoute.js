const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authutils = require('../util/authUtils');


router.get('/', authutils.permitAuthenticatedUser, movieController.showMovieList);
router.get('/add', authutils.permitAuthenticatedUser, movieController.showAddMovieForm);
router.get('/details/:movieId', authutils.permitAuthenticatedUser, movieController.showMovieDetails);
router.get('/edit/:movieId', authutils.permitAuthenticatedUser, movieController.showEditMovieForm);

router.post('/add', authutils.permitAuthenticatedUser, movieController.addMovie);
router.post('/edit', authutils.permitAuthenticatedUser, movieController.updateMovie);
router.get('/delete/:movieId', authutils.permitAuthenticatedUser, movieController.deleteMovie);

router.get('/guestSide', movieController.showMovieListGuest);

module.exports = router;