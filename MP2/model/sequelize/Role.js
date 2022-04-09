const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize.js');

const Role = sequelize.define('Role', {
    IdRole: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    RoleName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            }
        }
    }
});

module.exports = Role;