const Sequelize = require('sequelize');

const IncomeModel = {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: Sequelize.STRING,
    amount: Sequelize.DECIMAL(10, 2),
    date: Sequelize.DATE,
};

module.exports = IncomeModel;
