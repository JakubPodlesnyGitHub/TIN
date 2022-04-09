const Membership = require('../../model/sequelize/Membership');
const Client = require('../../model/sequelize/Client');
const Group = require('../../model/sequelize/Group');
const Role = require('../../model/sequelize/Role');

exports.getMemberships = () => {
    return Membership.findAll({
        include: [{
            model: Group,
            as: "Groups"
        }, {
            model: Client,
            as: "Clients"
        }]
    });
};

exports.getMembershipById = (membershipId) => {
    return Membership.findByPk(membershipId, {
        include: [{
            model: Group,
            as: "Groups"
        }, {
            model: Client,
            as: "Clients",
            include:[{
                model: Role,
                as: "role"
            }]
        }]
    });
};

exports.createMembership = (newMembershipData) => {
    return Membership.create({
        IdClient: newMembershipData.IdClient,
        IdGroup: newMembershipData.IdGroup,
        JoinDate: Date.now(),
        ClientNick: (newMembershipData.ClientNick == '') ?  'Guest' : newMembershipData.ClientNick
    });
};

exports.updateMebership = (membershipId,membershipData) => {
    return Membership.update(membershipData,{where: {IdMemberShip: membershipId}});
};

exports.deleteMembership = (membershipId) => {
    return Membership.destroy({
        where: {IdMemberShip: membershipId}
    });
};

exports.deleteManyMemberships = (membershipsIds) => {
    return Membership.find({IdMemberShip: {[Sequelize.Op.in]: membershipsIds}})
}