const MovieRepository = require('../repository/sequelize/MovieRepository.js');

exports.getMovies = (req, res, next) => {
    MovieRepository.getMovies().then(movies => {
        res.status(200).json(movies);
    }).catch(err => {
        console.log(err);
    });
};

exports.getMovieById = (req, res, next) => {
    const movieId = req.params.movieId;
    MovieRepository.getMovieById(movieId).then(movie => {
        if (!movie) {
            res.status(404).json({
                message: 'Movie with id: ' + movieId + ' not found'
            })
        } else {
            res.status(200).json(movie);
        }
    });
};

exports.createMovie = (req, res, next) => {
    MovieRepository.createMovie(req.body).then(newMovie => {
        res.status(201).json(newMovie);
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.updateMovie = (req, res, next) => {
    const movieId = req.params.movieId;
    MovieRepository.updateMovie(movieId, req.body).then(result => {
        res.status(200).json({message: 'Movie updated!', movie: result});
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteMovie = (req, res, next) => {
    const movieId = req.params.movieId;
    MovieRepository.deleteMovie(movieId).then(result => {
        res.status(200).json({message: 'Removed movie', movie: result})
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};