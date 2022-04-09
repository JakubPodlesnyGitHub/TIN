const GroupRespository = require('../repository/sequelize/GroupRepository');
const MembershipReposiotry = require("../repository/sequelize/MembershipRepository");
const {func} = require("joi");

exports.showGroupList = (req, res, next) => {
    GroupRespository.getGroups().then(groups => {
        res.render('Pages/Group/GroupList', {groups: groups, navLocation: 'group'});
    });
}

exports.showGroupMemberShipList = (req, res, next) => {
    const groupId = req.params.groupId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || req.session.loggedUser.role.RoleName == 'Client') {
        GroupRespository.getGroupById(groupId).then(group => {
            if (group.GroupOwner == req.session.loggedUser.IdClient || req.session.loggedUser.role.RoleName == 'Admin') {
                res.render('Pages/Group/GroupMembershipList', {group: group, navLocation: 'group'});
            } else {
                res.redirect('/groups');
            }
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showAddGroupForm = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin' || req.session.loggedUser.role.RoleName == 'Client') {
        res.render('Pages/Group/GroupForm', {
            group: {},
            pageTitle: req.__('group.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('group.form.add.btnLabel'),
            formAction: '/groups/add',
            navLocation: 'group',
            validationErrors: []
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showEditGroupForm = (req, res, next) => {
    const groupId = req.params.groupId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client')) {
        GroupRespository.getGroupById(groupId).then(group => {
            if (group.GroupOwner == req.session.loggedUser.IdClient || req.session.loggedUser.role.RoleName == 'Admin') {
                res.render('Pages/Group/GroupForm', {
                    group: group,
                    pageTitle: req.__('group.form.edit.pageTitle'),
                    formMode: 'edit',
                    btnLabel: req.__('group.form.edit.btnLabel'),
                    formAction: '/groups/edit',
                    navLocation: 'group',
                    validationErrors: []
                });
            } else {
                res.redirect('/groups');
            }
        });
    }
};

exports.showGroupDetails = (req, res, next) => {
    const groupId = req.params.groupId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || req.session.loggedUser.role.RoleName == 'Client') {
        GroupRespository.getGroupById(groupId).then(group => {
                res.render('Pages/Group/GroupForm', {
                    group: group,
                    pageTitle: req.__('group.form.membership'),
                    formMode: 'showDetails',
                    formAction: '',
                    navLocation: 'group',
                    validationErrors: []

                });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.addGroup = (req, res, next) => {
    const groupData = {...req.body};
    if (req.session.loggedUser.role.RoleName == 'Admin' || req.session.loggedUser.role.RoleName == 'Client') {
        GroupRespository.createGroup(groupData).then(result => {
            let membershipData = {
                'IdGroup': result.IdGroup,
                'IdClient': req.session.loggedUser.IdClient,
                'ClientNick': req.session.loggedUser.FirstName
            }
            MembershipReposiotry.createMembership(membershipData);
            res.redirect('/groups');
        }).catch(err => {
            res.render('Pages/Group/GroupForm', {
                group: groupData,
                pageTitle: req.__('group.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('group.form.add.btnLabel'),
                formAction: '/groups/add',
                navLocation: 'group',
                validationErrors: err.errors
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.updateGroup = (req, res, next) => {
    const groupId = req.body.IdGroup;
    const groupData = {...req.body};
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client')) {
        GroupRespository.updateGroup(groupId, groupData).then(result => {
            res.redirect('/groups');
        }).catch(err => {
            GroupRespository.getGroupById(groupId).then(group => {
                groupData.Membership = group.Membership;
                res.render('Pages/Movie/MovieForm', {
                    movie: groupData,
                    pageTitle: req.__('group.form.edit.pageTitle'),
                    formMode: 'edit',
                    btnLabel: req.__('group.form.edit.btnLabel'),
                    formAction: '/movies/edit',
                    navLocation: 'movies',
                    validationErrors: err.errors
                });
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.deleteGroup = (req, res, next) => {
    const groupId = req.params.groupId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client')) {
        GroupRespository.getGroupById(groupId).then(group => {
            if (group.GroupOwner == req.session.loggedUser.IdClient || req.session.loggedUser.role.RoleName == 'Admin') {
                GroupRespository.deleteGroup(groupId).then(() => {
                    res.redirect('/groups')
                });
            } else {
                res.redirect('/groups');
            }
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.deleteGroupMembers = (req, res, next) => {
    const groupId = req.params.groupId;
    const membershipId = req.params.membershipId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client')) {
        GroupRespository.getGroupById(groupId).then(group => {
            if (group.GroupOwner == req.session.loggedUser.IdClient || req.session.loggedUser.role.RoleName == 'Admin') {
                MembershipReposiotry.deleteMembership(membershipId).then(() => {
                    res.redirect(req.get('referer'));
                });
            } else {
                res.redirect('/groups');
            }
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

/*
function checkGroupOwner(groupId, req) {
    let concreateGroup;
    GroupRespository.getGroupById(groupId).then(gr => {
        concreateGroup = gr;
    });
    if (concreateGroup.GroupOwner == req.session.loggedUser.IdClient) {
        return true;
    }
    return false
};*/
