var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
//routery Tabel
const clientRoute = require('./routes/clientRoute');
const movieRoute = require('./routes/movieRoute');
const orderRoute = require('./routes/orderRoute');
const storeRoute = require('./routes/storeRoute');
const groupRoute = require('./routes/groupRoute');
const membershipRoute = require('./routes/membershipRoute');
//init i inne
const sequelizeInit = require('./config/sequelize/init');
const authUtils = require('./util/authUtils.js');
//cors
var cors = require('cors');
//routery API
const orderApiRoute = require('./routes/api/OrderApiRoute.js');
const clientApiRoute = require('./routes/api/ClientApiRoute.js');
const movieApiRoute = require('./routes/api/MovieApiRoute.js');
const storeApiRoute = require('./routes/api/StoreApiRoute.js');
const groupApiRoute = require('./routes/api/GroupApiRoute.js');
const memberShipApiRoute = require('./routes/api/MembershipApiRoute.js');
const roleApiRoute = require('./routes/api/RoleApiRoute.js');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//konfiguracja jezykow
const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en', 'de'],
    directory: path.join(__dirname, '/locales'),
    objectNotation: true,
    cookie: 'CineGO'
});
app.use(i18n.init);

app.use((req, res, next) => {
    if (!res.locals.lang) {
        const currentLang = req.cookies['CineGO'];
        res.locals.lang = currentLang;
    }
    next();
});

//autoryzacja
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if (!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});

//strona główna
app.use('/', indexRouter);
//strony tabel
app.use('/clients', authUtils.permitAuthenticatedUser, clientRoute);
app.use('/movies', movieRoute);
app.use('/orders', authUtils.permitAuthenticatedUser, orderRoute);
app.use('/store', authUtils.permitAuthenticatedUser, storeRoute);
app.use('/groups', authUtils.permitAuthenticatedUser, groupRoute);
app.use('/memberships', authUtils.permitAuthenticatedUser, membershipRoute);
//api strony
app.use('/api/orders', orderApiRoute);
app.use('/api/clients', clientApiRoute);
app.use('/api/movies', movieApiRoute);
app.use('/api/stores', storeApiRoute);
app.use('/api/groups', groupApiRoute);
app.use('/api/memberships', memberShipApiRoute);
app.use('/api/roles', roleApiRoute);
//lapanie bledow z inita
sequelizeInit().catch(err => console.log(err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
