const RoleRepository = require('../repository/sequelize/RoleRepository');

exports.getRoles = (req, res, next) => {
    RoleRepository.getRoles().then(roles => {
        res.status(200).json(roles);
    }).catch(err => {
        console.log(err);
    });
};

exports.getRoleById = (req, res, next) => {
    const roleId = req.params.roleId;
    RoleRepository.getRoleById(roleId).then(role => {
        if (!role) {
            res.status(404).json({
                message: 'Role with id: ' + roleId + 'not found'
            })
        } else {
            res.status(200).json(role);
        }
    });
};