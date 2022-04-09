const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize.js');

const Store = sequelize.define('Store', {
    IdStore: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    IdOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    IdMovie: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    Cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Dane pole musi być liczbą"
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
    Amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Dane pole musi być liczbą"
            },
            checkNegativeNumber: function (value) {
                if (value < 0) {
                    throw new Error("Pole musi być większe 0");
                }
            }
        }
    }
});
module.exports = Store;