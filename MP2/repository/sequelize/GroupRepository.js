const Client = require('../../model/sequelize/Client');
const Membership = require('../../model/sequelize/Membership');
const Group = require('../../model/sequelize/Group');

exports.getGroups = () => {
    return Group.findAll({
        include: [{
            model: Membership,
            as: 'Membership',
            include: [{
                model: Client,
                as: "Clients"
            }]
        }]
    });
};

exports.getGroupById = (idGroup) => {
    return Group.findByPk(idGroup, {
        include: [{
            model: Membership,
            as: 'Membership',
            include: [{
                model: Client,
                as: "Clients"
            }]
        }]
    });
};

exports.getGroupOwner = (groupId) => {
    return Group.findByPk(groupId).GroupOwner;
}

exports.createGroup = (newGroupData) => {
    return Group.create({
        GroupName: newGroupData.GroupName,
        CreationDate: Date.now(),
        Description: (newGroupData.Description == '') ? 'Brak' : newGroupData.Description,
        GroupOwner: newGroupData.GroupOwner
    })
};

exports.updateGroup = (groupId,groupData) => {
    return Group.update(groupData, {where: {IdGroup: groupId}});
};

exports.deleteGroup = (groupId) => {
    return Group.destroy({
        where: {IdGroup: groupId}
    });
};