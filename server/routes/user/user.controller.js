const ResponseHandler = require('../../utils/responses');
const SessionHandler = require('../../utils/session');
const UserHelper = require('./user.helper');
const {User, Role} = require('../../utils/database-handler');
const {validateToken} = require('../../utils/common');

const UserController = (() => {
    const Login_POST = (req, res) => {
        const user = req.body.user;
        if (!UserHelper.Login_ValidateInfo(user)) {
            res.json(ResponseHandler.general.missing_data({
                message: 'Missing or invalid info',
            }));
            return;
        }
        User.findOne({
            where: {email: user.email, password: user.password},
            include: [{model: Role}],
        }).then((user) => {
            if (!user) {
                res.json(ResponseHandler.user.login_failed());
                return;
            }
            const token = SessionHandler.loginUser({
                email: user.email, role: user.role.name, id: user.ID,
            });

            const payload = {
                token,
                role: user.role.name,
            };
            res.json(ResponseHandler.user.login_success(payload));
        });
    };

    const Logout_POST = (req, res) => {
        const token = req.body.token;
        if (!validateToken(token)) {
            res.json(ResponseHandler.general.invalid_token_format());
            return;
        }
        SessionHandler.logoutUser(token);
        res.json(ResponseHandler.user.logout_success());
    };

    const Register_POST = (req, res) => {
        const user = req.body.user;

        if (!UserHelper.Register_ValidateUser(user)) {
            res.json(ResponseHandler.user.register_failed_invalid_data());
            return;
        }

        User.create({
            email: user.email,
            password: user.password,
            full_name: user.full_name,
            status: 1,
            profile_image: 'N/A',
            roleID: 1,
        }).then(() => {
            res.json(ResponseHandler.user.register_success());
        }, (err) => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.json(ResponseHandler.user.register_failed_unique_email());
                return;
            }
            res.json(ResponseHandler.user.register_failed_unknown());
        });
    };

    const Edit_POST = (req, res) => {
        res.json({hehe: 'das'});
    };

    return {
        Edit_POST,
        Login_POST,
        Register_POST,
        Logout_POST,
    };
})();

module.exports = UserController;
