const MovieRepository = require('../repository/sequelize/MovieRepository.js');

exports.showMovieList = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin' || req.session.loggedUser.role.RoleName == 'Client') {

        MovieRepository.getMovies().then(movies => {
            res.render('Pages/Movie/MovieList', {movies: movies, navLocation: 'movies'});
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showMovieListGuest = (req, res, next) => {
    MovieRepository.getMovies().then(movies => {
        res.render('Pages/Movie/MovieListGuest', {movies: movies, navLocation: 'movies'});
    });
};

exports.showAddMovieForm = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        res.render('Pages/Movie/MovieForm', {
            movie: {},
            pageTitle: req.__('movie.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('movie.form.add.btnLabel'),
            formAction: '/movies/add',
            navLocation: 'movies',
            validationErrors: []
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showEditMovieForm = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        const movieId = req.params.movieId;
        MovieRepository.getMovieById(movieId).then(movie => {
            res.render('Pages/Movie/MovieForm', {
                movie: movie,
                pageTitle: req.__('movie.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('movie.form.edit.btnLabel'),
                formAction: '/movies/edit',
                navLocation: 'movies',
                validationErrors: []
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showMovieDetails = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        const movieId = req.params.movieId;
        MovieRepository.getMovieById(movieId).then(movie => {
            res.render('Pages/Movie/MovieForm', {
                movie: movie,
                pageTitle: req.__('movie.form.orders'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'movies',
                validationErrors: []
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.addMovie = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        const movieData = {...req.body};
        MovieRepository.createMovie(movieData).then(result => {
            res.redirect('/movies');
        }).catch(err => {
            console.log(err);
            res.render('Pages/Movie/MovieForm', {
                movie: movieData,
                pageTitle: req.__('movie.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('movie.form.add.btnLabel'),
                formAction: '/movies/add',
                navLocation: 'movies',
                validationErrors: err.errors
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.updateMovie = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        const movieId = req.body.IdMovie;
        const movieData = {...req.body};
        MovieRepository.updateMovie(movieId, movieData).then(result => {
            res.redirect('/movies');
        }).catch(err => {
            MovieRepository.getMovieById(movieId).then(movie => {
                movieData.Stores = movie.Stores;
                res.render('Pages/Movie/MovieForm', {
                    movie: movieData,
                    pageTitle: req.__('movie.form.edit.pageTitle'),
                    formMode: 'edit',
                    btnLabel: req.__('movie.form.edit.btnLabel'),
                    formAction: '/movies/edit',
                    navLocation: 'movies',
                    validationErrors: err.errors
                });
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.deleteMovie = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        const movieId = req.params.movieId;
        MovieRepository.deleteMovie(movieId).then(() => {
            res.redirect('/movies')
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};