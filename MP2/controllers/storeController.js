const StoreRepository = require('../repository/sequelize/StoreRepository.js');
const OrderRepository = require('../repository/sequelize/OrderRepository.js');
const MovieRepository = require('../repository/sequelize/MovieRepository.js');
const ClientRepository = require('../repository/sequelize/ClientRepository.js');

exports.showStoreList = (req, res, next) => {
    StoreRepository.getStore().then(stores => {
        res.render('Pages/Store/StoreList', {stores: stores, navLocation: 'store'});
    });
};

exports.showAddStoreForm = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin' || req.session.loggedUser.role.RoleName == 'Client') {
        let allOrders, allMovies;
        OrderRepository.getOrders().then(orders => {
            allOrders = orders;
            return MovieRepository.getMovies();
        }).then(movies => {
            allMovies = movies;
            res.render('Pages/Store/StoreForm', {
                store: {},
                pageTitle: req.__('store.form.add.pageTitle'),
                allMovies: allMovies,
                allOrders: allOrders,
                formMode: 'createNew',
                btnLabel: req.__('store.form.add.btnLabel'),
                formAction: '/store/add',
                navLocation: 'store',
                validationErrors: [],
                validateError: false
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showEditStoreForm = (req, res, next) => {
    const storeId = req.params.storeId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && findStoreId(storeId, req))) {
        let allOrders, allMovies;
        OrderRepository.getOrders().then(orders => {
            allOrders = orders;
            return MovieRepository.getMovies();
        }).then(movies => {
            allMovies = movies;
            return StoreRepository.getStoreById(storeId);
        }).then(store => {
            res.render('Pages/Store/StoreForm', {
                store: store,
                allMovies: allMovies,
                allOrders: allOrders,
                pageTitle: req.__('store.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('store.form.edit.btnLabel'),
                formAction: '/store/edit',
                navLocation: 'store',
                validationErrors: [],
                validateError: false
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showStoreDetails = (req, res, next) => {
    const storeId = req.params.storeId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && findStoreId(storeId, req))) {
        let allOrders, allMovies, allClients;
        OrderRepository.getOrders().then(orders => {
            allOrders = orders;
            return MovieRepository.getMovies();
        }).then(movies => {
            allMovies = movies;
            return ClientRepository.getClients();
        }).then(clients => {
            allClients = clients;
            return StoreRepository.getStoreById(storeId);
        }).then(store => {
            res.render('Pages/Store/StoreForm', {
                store: store,
                allMovies: allMovies,
                allClients: allClients,
                allOrders: allOrders,
                pageTitle: req.__('store.form.store'),
                pageTitleMovie: req.__('store.form.details.pageTitleMovie'),
                pageTitleClient: req.__('store.form.details.pageTitleClient'),
                pageTitleStore: req.__('store.form.details.pageTitleStore'),
                pageTitleOrder: req.__('store.form.details.pageTitleOrder'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'store',
                validationErrors: [],
                validateError: false
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'))
    }
};

exports.addStore = (req, res, next) => {
    const storeData = {...req.body};
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName = 'Client' && req.session.loggedUser.IdClient == storeData.Orders.clients.IdClient)) {
        StoreRepository.createStore(storeData).then(result => {
            res.redirect('/store');
        }).catch(err => {
            let allOrders, allMovies;
            OrderRepository.getOrders().then(orders => {
                allOrders = orders;
                return MovieRepository.getMovies();
            }).then(movies => {
                allMovies = movies;
                res.render('Pages/Store/StoreForm', {
                    store: storeData,
                    pageTitle: req.__('store.form.add.pageTitle'),
                    allMovies: allMovies,
                    allOrders: allOrders,
                    formMode: 'createNew',
                    btnLabel: req.__('store.form.add.btnLabel'),
                    formAction: '/store/add',
                    navLocation: 'store',
                    validationErrors: err.errors,
                    validateError: true
                });
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.updateStore = (req, res, next) => {
    const storeId = req.body.IdStore;
    const storeData = {...req.body};
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && findStoreId(storeId, req))) {
        StoreRepository.updateStore(storeId, storeData).then(result => {
            res.redirect('/store');
        }).catch(err => {
            let allOrders, allMovies;
            OrderRepository.getOrders().then(orders => {
                allOrders = orders;
                return MovieRepository.getMovies();
            }).then(movies => {
                allMovies = movies;
                return StoreRepository.getStoreById(storeId);
            }).then(store => {
                storeData.Orders = store.Orders;
                storeData.Movies = store.Movies;
                res.render('Pages/Store/StoreForm', {
                    store: storeData,
                    allMovies: allMovies,
                    allOrders: allOrders,
                    pageTitle: req.__('store.form.edit.pageTitle'),
                    formMode: 'edit',
                    btnLabel: req.__('store.form.edit.btnLabel'),
                    formAction: '/store/edit',
                    navLocation: 'store',
                    validationErrors: err.errors,
                    validateError: true
                });
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.deleteStore = (req, res, next) => {
    const storeId = req.params.storeId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && findStoreId(storeId, req))) {
        StoreRepository.deleteStore(storeId).then(() => {
            res.redirect('/store')
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

function findStoreId(storeId, req) {
    for (let order of req.session.loggedUser.orders) {
        for (let store of order.Stores) {
            if (store.IdStore == storeId) {
                return true;
            }
        }
    }
    return false;
}