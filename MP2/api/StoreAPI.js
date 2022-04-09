const StoreRepository = require('../repository/sequelize/StoreRepository.js');

exports.getStores = (req, res, next) => {
    StoreRepository.getStore().then(store => {
        res.status(200).json(store);
    }).catch(err => {
        console.log(err);
    });
};

exports.getStoreById = (req, res, next) => {
    const storeId = req.params.storeId;
    StoreRepository.getStoreById(storeId).then(store => {
        if (!store) {
            res.status(404).json({
                message: 'Store with id: ' + storeId + ' not found'
            })
        } else {
            res.status(200).json(store);
        }
    });
};

exports.createStore = (req, res, next) => {
    StoreRepository.createStore(req.body).then(newStore => {
        res.status(201).json(newStore);
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.updateStore = (req, res, next) => {
    const storeId = req.params.storeId;
    StoreRepository.updateStore(storeId, req.body).then(result => {
        res.status(200).json({message: 'Store updated!', store: result});
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteStore = (req, res, next) => {
    const storeId = req.params.storeId;
    StoreRepository.deleteStore(storeId).then(result => {
        res.status(200).json({message: 'Removed store', store: result})
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};