const ClientsRepository = require('../repository/sequelize/ClientRepository.js');
const authUtil = require('../util/authUtils.js');
const RoleRepository = require("../repository/sequelize/RoleRepository");

exports.showClientList = (req, res, next) => {
    ClientsRepository.getClients().then(clients => {
        res.render('Pages/Client/ClientList', {clients: clients, navLocation: 'clients'});
    });
}

exports.showAddClientForm = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        let allRoles;
        RoleRepository.getRoles().then(roles => {
            allRoles = roles;
            res.render('Pages/Client/ClientForm', {
                myClient: {},
                allRoles: allRoles,
                pageTitle: req.__('myClient.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('myClient.form.add.btnLabel'),
                formAction: '/clients/add',
                navLocation: 'clients',
                validationErrors: [],
                validateError: false
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showEditClientForm = (req, res, next) => {
    const clientId = req.params.clientId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && clientId == req.session.loggedUser.IdClient)) {
        let allRoles;
        RoleRepository.getRoles().then(roles => {
            allRoles = roles;
            return ClientsRepository.getClientById(clientId);
        }).then(client => {
            res.render('Pages/Client/ClientForm', {
                myClient: client,
                allRoles: allRoles,
                pageTitle: req.__('myClient.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('myClient.form.edit.btnLabel'),
                formAction: '/clients/edit',
                navLocation: 'clients',
                validationErrors: [],
                validateError: false
            });
        });
    }else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.showClientPasswordForm = (req, res, next) => {
    const clientId = req.params.clientId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && clientId == req.session.loggedUser.IdClient)) {
        ClientsRepository.getClientById(clientId).then(client => {
            res.render('Pages/Client/ClientPasswordFormChange', {
                myClient: client,
                pageTitle: req.__('myClient.form.changePassword.pageTitle'),
                navLocation: 'clients',
                formAction: '/clients/editPassword',
                btnLabel: req.__('myClient.form.changePassword.btnLabel'),
                validationErrors: [],
                validateError: false
            });
        });
    }else {
        throw new Error(req.__('authorization.loginError'));
    }
}

exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && clientId == req.session.loggedUser.IdClient)) {
        let allRoles;
        RoleRepository.getRoles().then(roles => {
            allRoles = roles;
            return ClientsRepository.getClientById(clientId);
        }).then(client => {
            res.render('Pages/Client/ClientForm', {
                myClient: client,
                allRoles: allRoles,
                pageTitle: req.__('myClient.form.orders'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'clients',
                validationErrors: [],
                validateError: false
            });
        });
    }else {
        throw new Error(req.__('authorization.loginError'));
    }
}

exports.addClient = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        const clientData = {...req.body};
        ClientsRepository.createClient(clientData).then(result => {
            res.redirect('/clients');
        }).catch(err => {
            let allRoles;
            RoleRepository.getRoles().then(roles => {
                allRoles = roles;
                res.render('Pages/Client/ClientForm', {
                    myClient: clientData,
                    allRoles: allRoles,
                    pageTitle: req.__('myClient.form.add.pageTitle'),
                    formMode: 'createNew',
                    btnLabel: req.__('myClient.form.add.btnLabel'),
                    formAction: '/clients/add',
                    navLocation: 'clients',
                    validationErrors: err.errors,
                    validateError: true
                });
            });
        });
    }else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.updatePassword = (req, res, next) => {
    const clientId = req.body.IdClient;
    if (req.session.loggedUser.role.RoleName == 'Admin' || (req.session.loggedUser.role.RoleName == 'Client' && clientId == req.session.loggedUser.IdClient)) {
        const clientPassword = {...req.body};
        ClientsRepository.updateClientPassword(clientId, clientPassword).then(result => {
            res.redirect('/clients');
        }).catch(err => {
            ClientsRepository.getClientById(clientId).then(client => {
                res.render('Pages/Client/ClientPasswordFormChange', {
                    myClient: client,
                    pageTitle: req.__('myClient.form.changePassword.pageTitle'),
                    btnLabel: req.__('myClient.form.changePassword.btnLabel'),
                    navLocation: 'clients',
                    formAction: '/clients/editPassword',
                    validationErrors: err.errors,
                    validateError: true
                });
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.updateClient = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin' || req.session.loggedUser.role.RoleName == 'Client') {
        const clientId = req.body.IdClient;
        const clientData = {...req.body};
        ClientsRepository.updateClient(clientId, clientData).then(result => {
            res.redirect('/clients');
        }).catch(err => {
            let allRoles;
            RoleRepository.getRoles().then(roles => {
                allRoles = roles;
                return ClientsRepository.getClientById(clientId);
            }).then(client => {
                clientData.orders = client.orders;
                clientData.role = client.role;
                res.render('Pages/Client/ClientForm', {
                    myClient: clientData,
                    allRoles: allRoles,
                    pageTitle: req.__('myClient.form.edit.pageTitle'),
                    formMode: 'edit',
                    btnLabel: req.__('myClient.form.edit.btnLabel'),
                    formAction: '/clients/edit',
                    navLocation: 'clients',
                    validationErrors: err.errors,
                    validateError: true
                });
            });
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};

exports.deleteClient = (req, res, next) => {
    if (req.session.loggedUser.role.RoleName == 'Admin') {
        const clientId = req.params.clientId;
        ClientsRepository.deleteClient(clientId).then(() => {
            res.redirect('/clients')
        });
    } else {
        throw new Error(req.__('authorization.loginError'));
    }
};