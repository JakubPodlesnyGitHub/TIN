const sequelize = require('./sequelize');

const Client = require('../../model/sequelize/Client');
const Order = require('../../model/sequelize/Order');
const Movie = require('../../model/sequelize/Movie');
const Store = require('../../model/sequelize/Store');
const Role = require('../../model/sequelize/Role');
const Group = require('../../model/sequelize/Group');
const Membership = require('../../model/sequelize/Membership');

const authUtil = require('../../util/authUtils')

module.exports = () => {
    Client.hasMany(Order, {
        as: 'orders',
        foreignKey: {name: 'IdClient', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Order.belongsTo(Client, {
        as: 'clients',
        foreignKey: {name: 'IdClient', allowNull: false}
    });

    Role.hasMany(Client, {
        as: 'clients',
        foreignKey: {name: 'IdRole', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Client.belongsTo(Role, {
        as: 'role',
        foreignKey: {name: 'IdRole', allowNull: false}
    });

    Order.hasMany(Store, {
        as: 'Stores',
        foreignKey: {name: 'IdOrder', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Store.belongsTo(Order, {
        as: 'Orders',
        foreignKey: {name: 'IdOrder', allowNull: false}
    });
    Movie.hasMany(Store, {
        as: 'Stores',
        foreignKey: {name: 'IdMovie', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Store.belongsTo(Movie, {
        as: 'Movies',
        foreignKey: {name: 'IdMovie', allowNull: false}
    });

    Client.hasMany(Membership, {
        as: 'Membership',
        foreignKey: {name: 'IdClient', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Membership.belongsTo(Client, {
        as: 'Clients',
        foreignKey: {name: 'IdClient', allowNull: false}
    });
    Group.hasMany(Membership, {
        as: 'Membership',
        foreignKey: {name: 'IdGroup', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Membership.belongsTo(Group, {
        as: 'Groups',
        foreignKey: {name: 'IdGroup', allowNull: false}
    });

    let allMovies, allOrders, allClients, allRoles, allGroups;

    return sequelize.sync({force: true}).then(() => {
        return Role.findAll();
    }).then(roles => {
        if (!roles || roles.length == 0) {
            return Role.bulkCreate([{
                RoleName: 'Client'
            }, {
                RoleName: 'Admin'
            }
            ]).then(() => {
                return Role.findAll();
            });
        } else {
            return roles;
        }
    }).then(roles => {
        allRoles = roles;
        return Client.findAll();
    }).then(clients => {
        if (!clients || clients.length == 0) {
            return Client.bulkCreate([{
                IdRole: allRoles[1].IdRole,
                FirstName: 'Jakub',
                LastName: 'Matczak',
                PostCode: '02-465',
                PhoneNumber: '555222333',
                Login: 'client1',
                Password: authUtil.hashPassowrd('123')
            }, {
                IdRole: allRoles[0].IdRole,
                FirstName: 'Michał',
                LastName: 'Polak',
                PostCode: '06-897',
                PhoneNumber: '668455789',
                Login: 'client2',
                Password: authUtil.hashPassowrd('456')
            }, {
                IdRole: allRoles[0].IdRole,
                FirstName: 'Mateusz',
                LastName: 'Romaniuk',
                PostCode: '03-968',
                PhoneNumber: '654897235',
                Login: 'client3',
                Password: authUtil.hashPassowrd('789')
            }
            ]).then(() => {
                return Client.findAll();
            });
        } else {
            return clients;
        }
    }).then(clients => {
        allClients = clients;
        return Order.findAll();
    }).then(orders => {
        if (!orders || orders.length == 0) {
            return Order.bulkCreate([{
                OrderCode: 1111,
                IdClient: allClients[0].IdClient,
                OrderDate: '2020-12-12',
                DeliveryCost: 200.00
            }, {
                OrderCode: 2222,
                IdClient: allClients[1].IdClient,
                OrderDate: '2020-06-12',
                DeliveryCost: 50.00
            }, {
                OrderCode: 3333,
                IdClient: allClients[2].IdClient,
                OrderDate: '2020-11-10',
                DeliveryCost: 100.00
            }]).then(() => {
                return Order.findAll();
            });
        } else {
            return orders;
        }
    }).then(orders => {
        allOrders = orders;
        return Movie.findAll();
    }).then(movies => {
        if (!movies || movies.length == 0) {
            return Movie.bulkCreate([{
                Title: 'Władca Pierścieni',
                MovieType: 'Fantasy',
                Director: 'Peter Jackson',
                Rate: 9,
                ReleaseDate: '2002-02-18',
                Oscar: true,
                Price: 50.00,
                MovieLength: 152
            }, {
                Title: 'Harry Potter',
                MovieType: 'Fantasy',
                Director: 'Chris Columbus',
                Rate: 8,
                ReleaseDate: '2001-01-17',
                Oscar: false,
                Price: 40.00,
                MovieLength: 116
            }, {
                Title: 'Dwóch papieży',
                MovieType: 'Fabularny',
                Director: 'Fernando Meirelles',
                Rate: 7,
                ReleaseDate: '2019-06-24',
                Oscar: true,
                Price: 60.00,
                MovieLength: 112
            }, {
                Title: 'Piękny umysł',
                MovieType: 'Biograficzny',
                Director: 'Ron Howard',
                Rate: 7,
                ReleaseDate: '2006-04-16',
                Oscar: true,
                Price: 70.00,
                MovieLength: 152
            }, {
                Title: 'Pewnego razu... w Hollywood',
                MovieType: 'Komediodramat',
                Director: 'Quentin Tarantino',
                Rate: 7,
                ReleaseDate: '2006-07-20',
                Oscar: true,
                Price: 70.00,
                MovieLength: 143
            }]).then(() => {
                return Movie.findAll();
            });
        } else {
            return movies;
        }
    }).then(movies => {
        allMovies = movies;
        return Store.findAll();
    }).then(store => {
        if (!store || store.length == 0) {
            return Store.bulkCreate([{
                IdOrder: allOrders[0].IdOrder,
                IdMovie: allMovies[0].IdMovie,
                Cost: 100.00,
                Amount: 2
            }, {
                IdOrder: allOrders[1].IdOrder,
                IdMovie: allMovies[1].IdMovie,
                Cost: 70.00,
                Amount: 1
            }, {
                IdOrder: allOrders[1].IdOrder,
                IdMovie: allMovies[4].IdMovie,
                Cost: 70.00,
                Amount: 1
            }, {
                IdOrder: allOrders[1].IdOrder,
                IdMovie: allMovies[3].IdMovie,
                Cost: 70.00,
                Amount: 1
            }, {
                IdOrder: allOrders[1].IdOrder,
                IdMovie: allMovies[2].IdMovie,
                Cost: 70.00,
                Amount: 1
            }, {
                IdOrder: allOrders[2].IdOrder,
                IdMovie: allMovies[4].IdMovie,
                Cost: 210.00,
                Amount: 3
            }]);
        } else {
            return store;
        }
    }).then(() => {
        return Group.findAll();
    }).then(group => {
        if (!group || group.length == 0) {
            return Group.bulkCreate([{
                GroupName: "Fantastyka1",
                CreationDate: '2021-07-21',
                Description: "Tu znajduje się opis grupy 1",
                GroupOwner: allClients[2].IdClient,
            }, {
                GroupName: "Akcja2",
                CreationDate: '2020-03-21',
                Description: "Tu znajduje się opis grupy 2",
                GroupOwner: allClients[1].IdClient,
            }, {
                GroupName: "Przygodówka3",
                CreationDate: '2021-09-21',
                Description: "Tu znajduje się opis grupy 3",
                GroupOwner: allClients[0].IdClient,
            }]);
        } else {
            return group;
        }
    }).then(groups => {
        allGroups = groups;
        return Membership.findAll();
    }).then(membership => {
        if(!membership || membership.length == 0){
            return Membership.bulkCreate([{
                IdClient: allClients[0].IdClient,
                IdGroup: allGroups[0].IdGroup,
                JoinDate: '2021-09-21',
                ClientNick: 'Client1:)'
            },{
                IdClient: allClients[1].IdClient,
                IdGroup: allGroups[1].IdGroup,
                JoinDate: '2021-01-01',
                ClientNick: 'Client2:)'
            },{
                IdClient: allClients[2].IdClient,
                IdGroup: allGroups[2].IdGroup,
                JoinDate: '2022-01-01',
                ClientNick: 'Client3:)'
            },{
                IdClient: allClients[1].IdClient,
                IdGroup: allGroups[2].IdGroup,
                JoinDate: '2022-01-01',
                ClientNick: 'Client4:)'
            },{
                IdClient: allClients[1].IdClient,
                IdGroup: allGroups[0].IdGroup,
                JoinDate: '2022-01-01',
                ClientNick: 'Client5:)'
            },{
                IdClient: allClients[2].IdClient,
                IdGroup: allGroups[1].IdGroup,
                JoinDate: '2022-01-01',
                ClientNick: 'Client6:)'
            },{
                IdClient: allClients[2].IdClient,
                IdGroup: allGroups[0].IdGroup,
                JoinDate: '2022-01-01',
                ClientNick: 'Client7:)'
            },{
                IdClient: allClients[0].IdClient,
                IdGroup: allGroups[1].IdGroup,
                JoinDate: '2022-01-01',
                ClientNick: 'Client8:)'
            }]);
        }else {
            return membership;
        }
    })
};