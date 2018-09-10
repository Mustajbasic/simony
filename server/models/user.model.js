const Sequelize = require('sequelize');

const UserModel = {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    profile_image: Sequelize.STRING,
};

module.exports = UserModel;
