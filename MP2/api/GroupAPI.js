const GroupRepository = require('../repository/sequelize/GroupRepository.js');

exports.getGroups = (req, res, next) => {
    GroupRepository.getGroups().then(groups => {
        res.status(200).json(groups);
    }).catch(err => {
        console.log(err);
    });
};

exports.getGroupById = (req, res, next) => {
    const groupId = req.params.groupId;

    GroupRepository.getGroupById(groupId).then(group => {
        if (!group) {
            res.status(404).json({
                message: 'Group with id: ' + groupId + 'not found'
            })
        } else {
            res.status(200).json(group)
        }
    });
};

exports.createGroup = (req, res, next) => {
    GroupRepository.createGroup(req.body).then(newGroupData => {
        res.status(201).json(newGroupData);
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateGroup = (req,res,next) => {
    const groupId = req.params.groupId;
    GroupRepository.updateGroup(groupId,req.body).then(result => {
        res.status(200).json({message: 'Group updated!', group: result });
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteGroup = (req,res,next) => {
    const groupId = req.params.groupId;
    GroupRepository.deleteGroup(groupId).then(result => {
        res.status(200).json({message: 'Removed group', group: result});
    }).catch(err => {
       if(!err.statusCode){
           err.statusCode = 500;
       }
       next(err);
    });
};