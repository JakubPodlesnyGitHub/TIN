const ClientRepository = require('../repository/sequelize/ClientRepository.js');
const authUtil = require('../util/authUtils.js');
exports.login = (req, res, next) => {
    const login = req.body.Login;
    const password = req.body.Password;
    ClientRepository.findClientByLogin(login).then(client => {
        if (!client) {
            res.render('index', {
                navLocation: '',
                loginError: req.__('authorization.loginError')
            });
        } else if (authUtil.comparePasswords(password, client.Password) === true) {
            req.session.loggedUser = client;
            res.redirect('/');
        } else {
            res.render('index', {
                navLocation: '',
                loginError: req.__('authorization.loginError')
            });
        }
    }).catch(err => {
        console.log(err);
    });
};

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
};