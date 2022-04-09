const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');

router.get('/',storeController.showStoreList);
router.get('/add',storeController.showAddStoreForm);
router.get('/details/:storeId',storeController.showStoreDetails);
router.get('/edit/:storeId',storeController.showEditStoreForm);

router.post('/add', storeController.addStore);
router.post('/edit', storeController.updateStore);
router.get('/delete/:storeId', storeController.deleteStore);
module.exports = router;