const Client = require('../../model/sequelize/Client');
const Order = require('../../model/sequelize/Order');
const Movie = require('../../model/sequelize/Movie');
const Store = require('../../model/sequelize/Store');

exports.getOrders = () => {
    return Order.findAll({
        include: [{
            model: Client,
            as: 'clients'
        }]
    });
};

exports.getOrderById = (idOrder) => {
    return Order.findByPk(idOrder, {
        include: [{
            model: Store,
            as: 'Stores',
            include: [{
                model: Movie,
                as: 'Movies'
            }]
        }, {
            model: Client,
            as: 'clients'
        }]
    });
};

exports.createOrder = (newOrderData) => {
    return Order.create({
        OrderCode: newOrderData.OrderCode,
        IdClient: newOrderData.IdClient,
        OrderDate: newOrderData.OrderDate,
        DeliveryCost: newOrderData.DeliveryCost
    });
};

exports.updateOrder = (orderId, orderData) => {
    return Order.update(orderData, {where: {IdOrder: orderId}});
};

exports.deleteOrder = (orderId) => {
    return Order.destroy({
        where: {IdOrder: orderId}
    });
};