const Client = require('../../model/sequelize/Client');
const Order = require('../../model/sequelize/Order');
const Movie = require('../../model/sequelize/Movie');
const Store = require('../../model/sequelize/Store');

exports.getMovies = () => {
    return Movie.findAll();
};

exports.getMovieById = (idMovie) => {
    return Movie.findByPk(idMovie, {
        include: [{
            model: Store,
            as: 'Stores',
            include: [{
                model: Order,
                as: 'Orders',
                include: [{
                    model: Client,
                    as: 'clients'
                }]
            }]
        }]
    });
};

exports.createMovie = (newMovieData) => {
    return Movie.create({
        Title: newMovieData.Title,
        MovieType: newMovieData.MovieType,
        Director: newMovieData.Director,
        Rate: newMovieData.Rate,
        ReleaseDate: newMovieData.ReleaseDate,
        Oscar: (newMovieData.Oscar == '') ? null : newMovieData.Oscar,
        Price: newMovieData.Price,
        MovieLength: (newMovieData.MovieLength == '') ? null : newMovieData.MovieLength
    });
};

exports.updateMovie = (movieId, movieData) => {
    movieData.Oscar = (movieData.Oscar == '') ? null : movieData.Oscar;
    movieData.MovieLength = (movieData.MovieLength == '') ? null : movieData.MovieLength;

    return Movie.update(movieData, {where: {IdMovie: movieId}});
};

exports.deleteMovie = (movieId) => {
    return Movie.destroy({
        where: {IdMovie: movieId}
    });
};
