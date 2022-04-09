const express = require('express');
const router = express.Router();

const storeApiController = require('../../api/StoreAPI.js');

router.get('/', storeApiController.getStores);
router.get('/:storeId', storeApiController.getStoreById);
router.post('/', storeApiController.createStore);
router.put('/:storeId', storeApiController.updateStore);
router.delete('/:storeId', storeApiController.deleteStore);

module.exports = router;