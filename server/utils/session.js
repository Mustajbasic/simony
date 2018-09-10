const jwt = require('jsonwebtoken');

// const SESSION_SECRET = process.argv[3];
const SESSION_SECRET = 'process.argv[3]';
const MAX_INACTIVE_TIME = 600000; // 1 Minute

const SessionHandler = (() => {
    let LoggedInUsers = [];

    const loginUser = (user) => {
        user.loggedIn = Date.now();
        const token = jwt.sign(user, SESSION_SECRET);

        const loggedUser = LoggedInUsers.find((singleUser) => {
            return singleUser.token === token;
        });
        if (!loggedUser) {
            LoggedInUsers.push({
                token,
                lastSeen: Date.now(),
            });
        }
        return token;
    };

    const logoutUser = (token) => {
        LoggedInUsers = LoggedInUsers.filter((singleUser)=>{
            return singleUser.token !== token;
        });
    };
    const checkUser = (token) => {
        const loggedUser = LoggedInUsers.find((singleUser)=>{
            return singleUser.token === token;
        });

        if (!loggedUser) {
            return false;
        }

        if (Date.now() - loggedUser.lastSeen >= MAX_INACTIVE_TIME) {
            logoutUser(token);
            return false;
        }
         return true;
    };

    const getUserIDFromToken = (token) => {
        const payload = jwt.verify(token, SESSION_SECRET);
        return payload.id;
    };

    return {
        checkUser,
        loginUser,
        logoutUser,
        getUserIDFromToken,
    };
})();

module.exports = SessionHandler;
