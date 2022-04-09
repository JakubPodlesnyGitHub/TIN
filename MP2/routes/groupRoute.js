const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/',groupController.showGroupList);
router.get('/memberships/:groupId',groupController.showGroupMemberShipList);
router.get('/add',groupController.showAddGroupForm);
router.get('/details/:groupId',groupController.showGroupDetails);
router.get('/edit/:groupId',groupController.showEditGroupForm);

router.post('/add',groupController.addGroup);
router.post('/edit',groupController.updateGroup);
router.get('/delete/:groupId',groupController.deleteGroup);
router.get('/delete/:groupId/:membershipId',groupController.deleteGroupMembers);

module.exports = router;