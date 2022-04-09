const express = require('express');
const router = express.Router();

const memberShipApiController = require('../../api/MemberShipAPI.js');

router.get('/', memberShipApiController.getMemberships);
router.get('/:membershipId', memberShipApiController.getMembershipById);
router.post('/', memberShipApiController.createMembership);
router.put('/:membershipId', memberShipApiController.updateMembership);
router.delete('/:membershipId', memberShipApiController.deleteMembership);

module.exports = router;