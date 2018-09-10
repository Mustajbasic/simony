const UserHelper = (() => {
    const Register_ValidateUser = (user) => {
        return user &&
            user.email &&
            user.password &&
            typeof user.email === 'string' &&
            typeof user.password === 'string' &&
            typeof user.full_name === 'string' &&
            user.email.length < 64 &&
            user.password.length < 256 &&
            user.full_name.length < 64;
    };
    const Login_ValidateInfo = (user) => {
        return user &&
            user.email &&
            user.password &&
            typeof user.email === 'string' &&
            typeof user.password === 'string' &&
            user.email.length < 64 &&
            user.password.length < 256;
    };

    return {
        Register_ValidateUser,
        Login_ValidateInfo,
    };
})();

module.exports = UserHelper;
