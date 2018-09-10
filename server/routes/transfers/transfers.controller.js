const ResponseHandler = require('../../utils/responses');
const SessionHandler = require('../../utils/session');
const TransfersHelper = require('./transfers.helper');
const {Income, Spending, Wallet, Category} = require('../../utils/database-handler');
const {validateToken, isValidDate} = require('../../utils/common');

const TransfersController = (() => {
    /*
        GetAll, GetPage and GetFromTo can be:
        only income, only spendings or both
        and
        per user or per wallet

        Edit and Delete can be
        either income or spending
    */
    const add_POST = (req, res) => {
        const token = req.body.token;
        const type = req.body.type;
        const transfer = req.body.transfer;

        if (!TransfersHelper.validateValuesAdd(token,
            type,
            transfer,
            res,
            ResponseHandler,
            SessionHandler,
            validateToken)) {
            return;
        }

        const userID = SessionHandler.getUserIDFromToken(token);
        Category.findAll({where: {
            ID: transfer.categoryID,
        }}).then((catCheck) => {
            if (catCheck.length===0) {
                res.json(ResponseHandler.general.missing_data({
                    message: 'Invalid Category ID.',
                }));
                return;
            }
            Wallet.findOne({where: {
                ID: transfer.walletID,
            }}).then((userWalletCheck) => {
                if (userWalletCheck === null || userWalletCheck.userID !== userID) {
                    res.json(ResponseHandler.general.missing_data({
                        message: 'Invalid Wallet ID.',
                    }));
                    return;
                }
                let currentAmount = parseFloat(userWalletCheck.amount);

                const obj = {
                    description: transfer.description,
                    amount: transfer.amount,
                    date: new Date(transfer.date),
                    walletID: transfer.walletID,
                    userID: userID,
                    categoryID: transfer.categoryID,
                };

                let amountToChange = obj.amount;
                let target = Income;

                if (type === 'spending') {
                    target = Spending;
                    amountToChange *= -1;
                }
                target.create(obj).then(() => {
                    Wallet.update({amount: currentAmount + amountToChange}, {where: {ID: obj.walletID}}).then(() => {
                        res.json(ResponseHandler.general.success());
                        return;
                    });
                });
            });
        });
    };
    const getAll_POST = (req, res) => {
        const token = req.body.token;
        const type = req.body.type;
        const target = req.body.target;

        if (!TransfersHelper.validateValuesGet(token,
            type,
            target,
            res,
            ResponseHandler,
            SessionHandler,
            validateToken)) {
                return false;
        }
        let condition;
        if (target === 'wallet') {
            const walletID = req.body.walletID;
            if (typeof walletID !== 'number') {
                res.json(ResponseHandler.general.missing_data({
                    message: 'Invalid Wallet ID.',
                }));
                return;
            }
            condition = {where: {walletID}};
        } else {
            const userID = SessionHandler.getUserIDFromToken(token);
            condition = {where: {userID}};
        }
        getAllTransfersShort(type, condition, res);
    };
    const getPage_POST = (req, res) => {};
    const getFromTo_POST = (req, res) => {
        const token = req.body.token;
        const type = req.body.type;
        const target = req.body.target;
        const from = req.body.from;
        const to = req.body.to;

        if ((!from && !to) || (from && !isValidDate(new Date(from)) || (to && !isValidDate(new Date(to))))) {
            res.json(ResponseHandler.general.missing_data({
                message: 'Invalid from and/or to or both are missing',
            }));
            return;
        }

        if (!TransfersHelper.validateValuesGet(token,
            type,
            target,
            res,
            ResponseHandler,
            SessionHandler,
            validateToken)) {
                return false;
        }

        let condition;
        if (from) {
            condition.where.date = {$gte: new Date(from)};
        }
        if (to) {
            condition.where.date = {$lte: new Date(to)};
        }
        if (target === 'wallet') {
            const walletID = req.body.walletID;
            if (typeof walletID !== 'number') {
                res.json(ResponseHandler.general.missing_data({
                    message: 'Invalid Wallet ID.',
                }));
                return;
            }
            condition.where.walletID = walletID;
        } else {
            const userID = SessionHandler.getUserIDFromToken(token);
            condition.where.userID = userID;
        }
        getAllTransfersShort(type, condition, res);
    };

    const edit_POST = (req, res) => {};

    const delete_DELETE = (req, res) => {
        const token = req.body.token;
        const type = req.body.type;
        const ID = req.body.ID;

        if (!TransfersHelper.validateValuesDelete(token, type, ID, res, ResponseHandler, SessionHandler, validateToken)) {
            return false;
        }

        let target = Income;
        if (type === 'spending') {
            target = Spending;
        }
        target.destroy({where: {ID}}).then(() => {
            res.json(ResponseHandler.general.success());
        });
    };
    const getAllCategories_POST = (req, res) => {
        const token = req.body.token;
        if (!validateToken(token)) {
            res.json(ResponseHandler.general.invalid_token_format());
            return false;
        }
        if (!SessionHandler.checkUser(token)) {
            res.json(ResponseHandler.general.access_denied());
            return false;
        }
    };


    const getAllTransfersShort = (type, condition, res) => {
        if (type === 'income') {
            Income.findAll(condition).then((transfers)=>{
                const returnTransfers = TransfersHelper.parseTransersForReturn(transfers);
                res.json(ResponseHandler.general.success(returnTransfers));
                return;
            });
        } else if (type === 'spending') {
            Spending.findAll(condition).then((transfers)=>{
                const returnTransfers = TransfersHelper.parseTransersForReturn(transfers);
                res.json(ResponseHandler.general.success(returnTransfers));
                return;
            });
        } else {
            const obj = {};
            Income.findAll(condition).then((incomes)=>{
                obj.income = TransfersHelper.parseTransersForReturn(incomes);
                Spending.findAll(condition).then((spendings)=>{
                    obj.spendings = TransfersHelper.parseTransersForReturn(spendings);
                    res.json(ResponseHandler.general.success(obj));
                    return;
                });
            });
        }
    };

    return {
        add_POST,
        getAll_POST,
        getPage_POST,
        getFromTo_POST,
        edit_POST,
        delete_DELETE,
        getAllCategories_POST,
    };
})();

module.exports = TransfersController;
