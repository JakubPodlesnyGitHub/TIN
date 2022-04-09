const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize.js');

const Order = sequelize.define('Order', {
    IdOrder: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    OrderCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: {
            args: true,
            msg: "Dany kod jest już w użyciu",
        },
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
    },

    IdClient: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    OrderDate: {
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

    DeliveryCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Dane pole musi być liczbą"
            }, isDecimal: {
                msg: "Dane pole musi być liczbą zmiennoprzecinkową"
            },
            checkNegativeNumber: function (value) {
                if (value < 0) {
                    throw new Error("Pole musi być większe 0");
                }
            }
        }
    }
});
module.exports = Order;