const {DB, Role, User, Category, WalletType} = require('./database-handler');

DB.sync({force: true}).then(() => {
    Role.create({name: 'User'});
    Role.create({name: 'Admin'});
    Role.create({name: 'Publisher'});

    User.create({
        email: 'admin@simony.app',
        password: 'asd',
        full_name: 'Belmin M',
        status: 1,
        profile_image: 'N/A',
        roleID: 1,
    });

    Category.create({name: 'Food', icon: 'N/A'});
    Category.create({name: 'Utility', icon: 'N/A'});

    WalletType.create({name: 'Cash', icon: 'N/A'});
    WalletType.create({name: 'Card', icon: 'N/A'});
});

