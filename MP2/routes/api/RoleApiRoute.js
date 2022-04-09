const express = require('express');
const router = express.Router();

const RoleApiController = require('../../api/RoleAPI.js');

router.get('/', RoleApiController.getRoles);
router.get('/:roleId', RoleApiController.getRoleById);

module.exports = router;