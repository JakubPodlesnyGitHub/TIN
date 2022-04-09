const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/mebershipController.js');

router.get('/', membershipController.showMemberShipList);
router.get('/add', membershipController.showAddMemberShipForm);
router.get('/details/:membershipId', membershipController.showMembershipDetails);
router.get('/edit/:membershipId', membershipController.showEditMembershipForm);

router.post('/add', membershipController.addMembership);
router.post('/edit', membershipController.updateMembership);
router.get('/delete/:membershipId', membershipController.deleteMembership);

module.exports = router;