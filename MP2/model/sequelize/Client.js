const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize.js');

const Client = sequelize.define('Client', {
    IdClient: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    IdRole: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    FirstName: {
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
    LastName: {
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
    PostCode: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            checkPostCode: function (value) {
                if (!/^[0-9]{2}-[0-9]{3}$/i.test(value)) {
                    throw new Error("Pole powinno zawierać format ll-lll gdzie l to cyfra");
                }
            }
        }
    },
    PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            checkPhone: function (value) {
                if (value != '') {
                    if (!/^[0-9]{9}$/i.test(value)) {
                        throw new Error("Pole powinno zawierać 9 cyfr");
                    }
                }
            }
        }
    },
    Login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Dany login użytkownika jest już w użyciu",
        },
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    }
});
module.exports = Client;