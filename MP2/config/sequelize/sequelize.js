const Sequelize = require('sequelize');
const sequelize = new Sequelize('tinProject_s20540','root','root',{
   dialect: 'mysql',
   host: 'localhost'
});
module.exports = sequelize;