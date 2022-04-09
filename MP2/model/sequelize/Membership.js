const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize.js');

const Membership = sequelize.define('Memebership', {
    IdMemberShip:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
    IdGroup: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    JoinDate:{
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
    ClientNick:{
        type: Sequelize.STRING,
        allowNull:true,
        validate:{
            checkDes: function (value) {
                if (value != '') {
                    if(value.length < 2 || value.length > 200){
                        throw new Error("Pole powinno zawierać od 2 do 50 znaków")
                    }
                }
            }
        }
    }
});

module.exports = Membership;