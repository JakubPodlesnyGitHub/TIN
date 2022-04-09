const Client = require('../../model/sequelize/Client');
const Order = require('../../model/sequelize/Order');
const Movie = require('../../model/sequelize/Movie');
const Store = require('../../model/sequelize/Store');
const {Sequelize} = require("sequelize");

exports.getStore = () => {
    return Store.findAll({
        include: [{
            model: Order,
            as: 'Orders',
            include: [{
                model: Client,
                as: 'clients'
            }]
        }, {
            model: Movie,
            as: 'Movies'
        }]
    });
};

exports.getStoreById = (idStore) => {
    return Store.findByPk(idStore, {
        include: [{
            model: Order,
            as: 'Orders',
            include: {
                model: Client,
                as: 'clients'
            },
        }, {
            model: Movie,
            as: 'Movies'
        }]
    });
};

exports.createStore = (newStoreData) => {
    return Store.create({
        IdOrder: newStoreData.IdOrder,
        IdMovie: newStoreData.IdMovie,
        Cost: newStoreData.Cost,
        Amount: newStoreData.Amount
    });
};

exports.updateStore = (storeId, storeData) => {
    return Store.update(storeData, {where: {IdStore: storeId}});
};

exports.deleteStore = (storeId) => {
    return Store.destroy({
        where: {IdStore: storeId}
    });
};

exports.deleteManyStores = (storeIds) => {
    return Store.find({ IdStore: {[Sequelize.Op.in]: storeIds}})
};