const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize.js');

const Group = sequelize.define('Group',{
    IdGroup: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    GroupName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            }
        }
    },
    CreationDate: {
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
    Description:{
        type: Sequelize.STRING,
        allowNull:true,
        validate:{
            checkDes: function (value) {
                if (value != '') {
                   if(value.length < 2 || value.length > 200){
                       throw new Error("Pole powinno zawierać od 2 do 200 znaków")
                   }
                }
            }
        }
    },
    GroupOwner: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    }
});

module.exports = Group;