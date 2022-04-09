const OrderRepository = require('../repository/sequelize/OrderRepository.js');
const ClientRepository = require('../repository/sequelize/ClientRepository.js');


exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders().then(orders => {
        res.render('Pages/Order/OrderList', {orders: orders, navLocation: 'orders'});
    });
}

exports.showAddOrderForm = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin' || req.session.loggedUser.role.RoleName == 'Client') {
        let allClients;
        ClientRepository.getClients().then(clients => {
            allClients = clients;
        }).then(() => {
            res.render('Pages/Order/OrderForm', {
                order: {},
                allClients: allClients,
                pageTitle: req.__('order.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('order.form.add.btnLabel'),
                formAction: '/orders/add',
                navLocation: 'orders',
                validationErrors: [],
                validateError: false
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
}

exports.showEditOrderForm = (req, res, next) => {
    const orderId = req.params.orderId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client')) {
        let allClients;
        ClientRepository.getClients().then(clients => {
            allClients = clients
            return OrderRepository.getOrderById(orderId);
        }).then(order => {
            res.render('Pages/Order/OrderForm', {
                order: order,
                allClients: allClients,
                pageTitle: req.__('order.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('order.form.edit.btnLabel'),
                formAction: '/orders/edit',
                navLocation: 'orders',
                validationErrors: [],
                validateError: false
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
}

exports.showOrderDetails = (req, res, next) => {
    const orderId = req.params.orderId;
    //do poprawy
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && findOrderId(orderId,req))) {
        let allClients;
        ClientRepository.getClients().then(clients => {
            allClients = clients
            return OrderRepository.getOrderById(orderId);
        }).then(order => {
            res.render('Pages/Order/OrderForm', {
                order: order,
                allClients: allClients,
                pageTitle: req.__('order.form.orders'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'orders',
                validationErrors: [],
                validateError: false
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
}


exports.addOrder = (req, res, next) => {
    const orderData = {...req.body};
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName = 'Client' && req.session.loggedUser.IdClient == orderData.IdClient)) {
        OrderRepository.createOrder(orderData).then(result => {
            res.redirect('/orders');
        }).catch(err => {
            let allClients;
            ClientRepository.getClients().then(clients => {
                allClients = clients;
            }).then(() => {
                res.render('Pages/Order/OrderForm', {
                    order: orderData,
                    allClients: allClients,
                    pageTitle: req.__('order.form.add.pageTitle'),
                    formMode: 'createNew',
                    btnLabel: req.__('order.form.add.btnLabel'),
                    formAction: '/orders/add',
                    navLocation: 'orders',
                    validationErrors: err.errors,
                    validateError: true
                });
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
}

exports.updateOrder = (req, res, next) => {
    const orderId = req.body.IdOrder;
    const orderData = {...req.body};
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName = 'Client' && req.session.loggedUser.IdClient == orderData.IdClient)) {
        OrderRepository.updateOrder(orderId, orderData).then(result => {
            res.redirect('/orders');
        }).catch(err => {
            let allClients;
            ClientRepository.getClients().then(clients => {
                allClients = clients
                return OrderRepository.getOrderById(orderId);
            }).then(order => {
                orderData.Stores = order.Stores;
                orderData.clients = order.clients;
                res.render('Pages/Order/OrderForm', {
                    order: orderData,
                    allClients: allClients,
                    pageTitle: req.__('order.form.edit.pageTitle'),
                    formMode: 'edit',
                    btnLabel: req.__('order.form.edit.btnLabel'),
                    formAction: '/orders/edit',
                    navLocation: 'orders',
                    validationErrors: err.errors,
                    validateError: true
                });
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
}

exports.deleteOrder = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        const orderId = req.params.orderId;
        OrderRepository.deleteOrder(orderId).then(() => {
            res.redirect('/orders')
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
}

function findOrderId(orderId, req) {
    for (let order of req.session.loggedUser.orders) {
        if (order.IdOrder == orderId) {
            return true;
        }
    }
    return false;
}