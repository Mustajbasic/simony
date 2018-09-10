const Sequelize = require('sequelize');

const CategoryModel = {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false,
    },
};

module.exports = CategoryModel;
