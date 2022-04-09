const ClientRepository = require('../repository/sequelize/ClientRepository');
const GroupRepository = require('../repository/sequelize/GroupRepository');
const MembershipRepository = require('../repository/sequelize/MembershipRepository');

exports.showMemberShipList = (req, res, next) => {
    MembershipRepository.getMemberships().then(memberships => {
        res.render('Pages/Membership/MembershipList', {memberships: memberships, navLocation: 'membership'});
    });
};

exports.showAddMemberShipForm = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin' || req.session.loggedUser.role.RoleName == 'Client') {
        let allClients, allGroups;
        ClientRepository.getClients().then(clients => {
            allClients = clients;
            return GroupRepository.getGroups();
        }).then(groups => {
            allGroups = groups;
            res.render('Pages/Membership/MembershipForm', {
                memberShip: {},
                pageTitle: req.__('memberShip.form.add.pageTitle'),
                allGroups: allGroups,
                allClients: allClients,
                formMode: 'createNew',
                btnLabel: req.__('memberShip.form.add.btnLabel'),
                formAction: '/memberships/add',
                navLocation: 'membership',
                validationErrors: [],
                validateError: false
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showEditMembershipForm = (req, res, next) => {
    const membershipId = req.params.membershipId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && findMembershipId(membershipId, req))) {
        let allClients, allGroups;
        ClientRepository.getClients().then(clients => {
            allClients = clients;
            return GroupRepository.getGroups();
        }).then(groups => {
            allGroups = groups;
            return MembershipRepository.getMembershipById(membershipId);
        }).then(membership => {
            res.render('Pages/Membership/MembershipForm', {
                memberShip: membership,
                pageTitle: req.__('memberShip.form.edit.pageTitle'),
                allGroups: allGroups,
                allClients: allClients,
                formMode: 'edit',
                btnLabel: req.__('memberShip.form.edit.btnLabel'),
                formAction: '/memberships/edit',
                navLocation: 'membership',
                validationErrors: [],
                validateError: false
            });
        });
    }else {
        throw new Error(req.__('authorization.loginError'));
    }
};

/*do poprawy*/
exports.showMembershipDetails = (req, res, next) => {
    const membershipId = req.params.membershipId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && findMembershipId(membershipId, req))) {
        let allClients, allGroups;
        ClientRepository.getClients().then(clients => {
            allClients = clients;
            return GroupRepository.getGroups();
        }).then(groups => {
            allGroups = groups;
            return MembershipRepository.getMembershipById(membershipId);
        }).then(membership => {
            res.render('Pages/Membership/MembershipForm', {
                memberShip: membership,
                pageTitle: req.__('memberShip.form.memberShipDetails'),
                allGroups: allGroups,
                allClients: allClients,
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'membership',
                validationErrors: [],
                validateError: false
            });
        });
    }else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.addMembership = (req, res, next) => {
    const membershipData = {...req.body};
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName = 'Client' && req.session.loggedUser.IdClient == membershipData.Clients.IdClient)) {
        MembershipRepository.createMembership(membershipData).then(result => {
            res.redirect('/memberships');
        }).catch(err => {
            let allClients, allGroups;
            ClientRepository.getClients().then(clients => {
                allClients = clients;
                return GroupRepository.getGroups();
            }).then(groups => {
                allGroups = groups;
                res.render('Pages/Membership/MembershipForm', {
                    memberShip: membershipData,
                    pageTitle: req.__('memberShip.form.add.pageTitle'),
                    allGroups: allGroups,
                    allClients: allClients,
                    formMode: 'createNew',
                    btnLabel: req.__('memberShip.form.add.btnLabel'),
                    formAction: '/memberships/add',
                    navLocation: 'membership',
                    validationErrors: err.errors,
                    validateError: true
                });
            });
        });
    }else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.updateMembership = (req, res, next) => {
    const membershipId = req.body.IdMemberShip;
    const memberShipData = {...req.body};
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && findMembershipId(membershipId, req))) {
        MembershipRepository.updateMebership(membershipId, memberShipData).then(result => {
            res.redirect('/memberships');
        }).catch(err => {
            let allClients, allGroups;
            ClientRepository.getClients().then(clients => {
                allClients = clients;
            }).then(groups => {
                allGroups = groups;
                return MembershipRepository.getMembershipById(membershipId);
            }).then(membership => {
                memberShipData.Clients = membership.Clients;
                memberShipData.Groups = membership.Groups;
                res.render('Pages/Membership/MembershipForm', {
                    memberShip: memberShipData,
                    pageTitle: req.__('memberShip.form.edit.pageTitle'),
                    allGroups: allGroups,
                    allClients: allClients,
                    formMode: 'edit',
                    btnLabel: req.__('memberShip.form.edit.btnLabel'),
                    formAction: '/memberships/edit',
                    navLocation: 'membership',
                    validationErrors: [],
                    validateError: true
                });
            });
        });
    }else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.deleteMembership = (req, res, next) => {
    const membershipId = req.params.membershipId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && findMembershipId(membershipId, req))) {
        MembershipRepository.deleteMembership(membershipId).then(() => {
            res.redirect('/memberships')
        });
    }else {
        throw new Error(req.__('authorization.loginError'));
    }
};

function findMembershipId(membershipId, req) {
    for (let membership of req.session.loggedUser.Membership) {
        if (membership.IdMemberShip == membershipId) {
            return true;
        }
    }
    return false;
}