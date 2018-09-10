const Sequelize = require('sequelize');

const WishlistModel = {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    visibility: Sequelize.TINYINT,
};

module.exports = WishlistModel;
