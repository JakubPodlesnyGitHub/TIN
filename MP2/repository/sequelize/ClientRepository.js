const Client = require('../../model/sequelize/Client');
const Order = require('../../model/sequelize/Order');
const Movie = require('../../model/sequelize/Movie');
const Store = require('../../model/sequelize/Store');
const Role = require('../../model/sequelize/Role');
const Membership = require("../../model/sequelize/Membership");
const Group = require("../../model/sequelize/Group");
const authUtil = require('../../util/authUtils');


exports.getClients = () => {
    return Client.findAll();
};

exports.getClientById = (idClient) => {
    return Client.findByPk(idClient, {
        include: [{
            model: Order,
            as: 'orders',
            include: [{
                model: Store,
                as: 'Stores',
                include: [{
                    model: Movie,
                    as: 'Movies',
                }]
            }],
        },{
            model: Role,
            as: 'role'
        },{
           model: Membership,
           as: "Membership",
           include: [{
               model: Group,
               as: "Groups"
           }]
        }]
    });
};

exports.findClientByLogin = (login) => {
    return Client.findOne({
        where: {Login: login},
        include: [{
            model: Order,
            as: 'orders',
            include: [{
                model: Store,
                as: 'Stores',
                include: [{
                    model: Movie,
                    as: 'Movies',
                }]
            }],
        },{
            model: Role,
            as: 'role'
        },{
            model: Membership,
            as: "Membership",
            include: [{
                model: Group,
                as: "Groups"
            }]
        }]
    });
};

exports.updateClientPassword = (clientId, newClientPassword) => {
    newClientPassword.Password = authUtil.hashPassowrd(newClientPassword.Password)
    return Client.update(newClientPassword, {where: {IdClient: clientId}})
}

exports.createClient = (newClientData) => {
    return Client.create({
        FirstName: newClientData.FirstName,
        LastName: newClientData.LastName,
        PostCode: newClientData.PostCode,
        PhoneNumber: newClientData.PhoneNumber,
        Login: newClientData.Login,
        Password: authUtil.hashPassowrd(newClientData.Password),
        IdRole: newClientData.IdRole
    });
};

exports.updateClient = (clientId, clientData) => {
    return Client.update(clientData, {where: {IdClient: clientId}});
};

exports.deleteClient = (clientId) => {
    return Client.destroy({
        where: {IdClient: clientId}
    });
};