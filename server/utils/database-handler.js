const Sequelize = require('sequelize');
const Models = require('../models');
const DB = new Sequelize('dev_simony', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const Blogpost = DB.define('blogpost', Models.Blogpost);
const Category = DB.define('category', Models.Category);
const Income = DB.define('income', Models.Income);
const Role = DB.define('role', Models.Role);
const Spending = DB.define('spending', Models.Spending);
const User = DB.define('user', Models.User);
const Wallet = DB.define('wallet', Models.Wallet);
const WalletType = DB.define('wallettype', Models.WalletType);
const Wishlist = DB.define('wishlist', Models.Wishlist);
const WishlistItem = DB.define('wishlistitem', Models.WishlistItem);

User.belongsTo(Role);
Wallet.belongsTo(WalletType);
Wallet.belongsTo(User);
Wishlist.belongsTo(User);
WishlistItem.belongsTo(Wishlist);
Blogpost.belongsTo(User);
Income.belongsTo(User);
Income.belongsTo(Category);
Income.belongsTo(Wallet);
Spending.belongsTo(User);
Spending.belongsTo(Category);
Spending.belongsTo(Wallet);

module.exports = {
    DB,
    Blogpost,
    Category,
    Income,
    Role,
    Spending,
    User,
    WalletType,
    Wallet,
    WishlistItem,
    Wishlist,
};
