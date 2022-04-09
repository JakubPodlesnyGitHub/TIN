const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize.js');

const Movie = sequelize.define('Movie', {
    IdMovie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    Title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },

    MovieType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },

    Director: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            checkDirector: function (value) {
                if (!/^[a-zA-Z]+\s[a-zA-Z]+$/i.test(value)) {
                    throw new Error("Pole powinno zawierać dwa słowa -> imie i nazwisko");
                }
            }
        }
    },

    Rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Dane pole musi być liczbą"
            }
        }
    },
    ReleaseDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            checkDateFuture: function (value) {
                if (new Date(value) > Date.now()) {
                    throw new Error("Data musi być maksymalnie dzisiejsza");
                }
            }
        }
    },

    Oscar: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },

    Price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Dane pole musi byc liczbą"
            },
            isDecimal: {
                msg: "Dane pole musi być liczbą zmiennoprzecinkową"
            },
            checkNegativeNumber: function (value) {
                if (value < 0) {
                    throw new Error("Pole musi być większe 0");
                }
            }
        }
    },

    MovieLength: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            checkMovieLength: function (value) {
                if (value != null) {
                    isNumeric: {
                        msg: "Dane pole musi byc liczbą";
                    }
                }
            },
            checkNegativeNumber: function (value) {
                if (value < 0) {
                    throw new Error("Pole musi być większe 0");
                }
            }
        }
    }
});
module.exports = Movie;