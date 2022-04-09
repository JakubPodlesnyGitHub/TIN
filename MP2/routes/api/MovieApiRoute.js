const express = require('express');
const router = express.Router();

const movieApiController = require('../../api/MovieAPI.js');

router.get('/', movieApiController.getMovies);
router.get('/:movieId', movieApiController.getMovieById);
router.post('/', movieApiController.createMovie);
router.put('/:movieId', movieApiController.updateMovie);
router.delete('/:movieId', movieApiController.deleteMovie);

module.exports = router;