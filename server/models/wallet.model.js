const Sequelize = require('sequelize');

const WalletModel = {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    amount: Sequelize.DECIMAL(10, 2),
};

module.exports = WalletModel;
