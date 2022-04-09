const Client = require("../../model/sequelize/Client");
const Role = require("../../model/sequelize/Role");

exports.getRoles = () => {
    return Role.findAll({
        include: [{
            model: Client,
            as: 'clients'
        }]
    });
};

exports.getRoleById = (idRole) => {
    return Role.findByPk(idRole, {
        include: [{
            model: Client,
            as: 'clients'
        }]
    });
};