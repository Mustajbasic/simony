const Sequelize = require('sequelize');

const WishlistItemModel = {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    price: Sequelize.DECIMAL(10, 2),
    status: Sequelize.TINYINT,
    due_date: Sequelize.DATE,
};

module.exports = WishlistItemModel;
