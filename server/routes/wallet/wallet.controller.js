const WalletHelper = require('./wallet.helper');
const ResponseHandler = require('../../utils/responses');
const SessionHandler = require('../../utils/session');
const {Wallet, WalletType} = require('../../utils/database-handler');
const {validateToken} = require('../../utils/common');

const WalletController = (() => {
    const GetAll_POST = (req, res) => {
        const token = req.body.token;
        if (!validateToken(token)) {
            res.json(ResponseHandler.general.invalid_token_format());
            return;
        }
        if (!SessionHandler.checkUser(token)) {
            res.json(ResponseHandler.general.access_denied());
            return;
        }
        const userID = SessionHandler.getUserIDFromToken(token);
        Wallet.findAll({
            where: {
                userID,
            },
            include: [{model: WalletType}],
        }).then((data) => {
            const allWallets = data.map((userWallet) => {
                return {
                    ID: userWallet.ID,
                    name: userWallet.name,
                    amount: userWallet.amount,
                    type: userWallet.wallettype.name,
                    typeID: userWallet.wallettype.ID,
                    typeIcon: userWallet.wallettype.icon,
                };
            });
            res.json(ResponseHandler.general.success(allWallets));
            return;
        });
    };
    const Add_POST = (req, res) => {
        const token = req.body.token;
        const walletFromReq = req.body.wallet;
        if (!WalletHelper.ValidateWallet(walletFromReq)) {
            res.json(ResponseHandler.general.missing_data({
                message: 'Missing or invalid info',
            }));
            return;
        }
        if (!validateToken(token)) {
            res.json(ResponseHandler.general.invalid_token_format());
            return;
        }
        if (!SessionHandler.checkUser(token)) {
            res.json(ResponseHandler.general.access_denied());
            return;
        }
        const userID = SessionHandler.getUserIDFromToken(token);
        Wallet.create({
            name: walletFromReq.name,
            amount: walletFromReq.amount,
            wallettypeID: walletFromReq.wallettypeID,
            userID: userID,
        }).then(() => {
            res.json(ResponseHandler.general.success());
            return;
        });
    };
    const Delete_DELETE = (req, res) => {};
    const Edit_POST = (req, res) => {};
    const GetAllTypes_POST = (req, res) => {
        const token = req.body.token;
        if (!validateToken(token)) {
            res.json(ResponseHandler.general.invalid_token_format());
            return;
        }
        if (!SessionHandler.checkUser(token)) {
            res.json(ResponseHandler.general.access_denied());
            return;
        }
        WalletType.findAll().then((walletTypes) => {
            const types = walletTypes.map( (type) => {
                return {ID: type.ID, name: type.name, icon: type.icon};
            });
            res.json(ResponseHandler.general.success(types));
        });
    };
    return {
        GetAll_POST,
        Add_POST,
        Delete_DELETE,
        Edit_POST,
        GetAllTypes_POST,
    };
})();

module.exports = WalletController;
