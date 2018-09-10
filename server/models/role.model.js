const Sequelize = require('sequelize');

const RoleModel = {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
};

module.exports = RoleModel;
