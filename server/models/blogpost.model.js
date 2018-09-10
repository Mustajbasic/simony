const Sequelize = require('sequelize');

const BlogpostModel = {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    visbility: Sequelize.TINYINT,
    reads: Sequelize.INTEGER,
    published: Sequelize.DATE,
};

module.exports = BlogpostModel;
