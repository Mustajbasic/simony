const {isValidDate} = require('../../utils/common');

const TransfersHelper = (() => {
    const validateTarget = (target) => {
        return target &&
            typeof target === 'string' &&
            (target === 'user' || target === 'wallet');
    };

    const validateType = (type, allowBoth) => {
        return type &&
            typeof type === 'string' &&
            (type === 'income' || type === 'spending' || (allowBoth && type === 'both'));
    };

    const validateTransfer = (transfer) => {
        const firstPart = transfer &&
            transfer.description &&
            transfer.amount &&
            transfer.date &&
            transfer.categoryID &&
            transfer.walletID &&
            typeof transfer.description === 'string' &&
            typeof transfer.date === 'number' &&
            typeof transfer.amount === 'number' &&
            typeof transfer.categoryID === 'number' &&
            typeof transfer.walletID === 'number' &&
            transfer.amount > 0;
        if (!firstPart) {
            return false;
        }
        const date = new Date(transfer.date);
        return isValidDate(date);
    };

    const parseTransersForReturn = (transfers) => {
        return transfers.map((item) => {
            return {
                ID: item.ID,
                description: item.description,
                amount: item.amount,
                date: item.date,
                categoryID: item.categoryID,
                walletID: item.walletID,

            };
        });
    };

    const validateValuesAdd = (token, type, transfer, res, ResponseHandler, SessionHandler, validateToken) => {
        if (!validateToken(token)) {
            res.json(ResponseHandler.general.invalid_token_format());
            return false;
        }
        if (!SessionHandler.checkUser(token)) {
            res.json(ResponseHandler.general.access_denied());
            return false;
        }
        if (!TransfersHelper.validateType(type, false)) {
            res.json(ResponseHandler.general.missing_data({
                message: 'Invalid transfer type. Only "income" or "spending" is allowed.',
            }));
            return false;
        }
        if (!TransfersHelper.validateTransfer(transfer)) {
            res.json(ResponseHandler.general.missing_data({
                message: 'Invalid transfer info.',
            }));
            return false;
        }
    };

    const validateValuesGet = (token, type, target, res, ResponseHandler, SessionHandler, validateToken) => {
        if (!validateToken(token)) {
            res.json(ResponseHandler.general.invalid_token_format());
            return false;
        }
        if (!SessionHandler.checkUser(token)) {
            res.json(ResponseHandler.general.access_denied());
            return false;
        }

        if (!TransfersHelper.validateType(type, false)) {
            res.json(ResponseHandler.general.missing_data({
                message: 'Invalid transfer type. Only income, spending or both is allowed.',
            }));
            return false;
        }
        if (!TransfersHelper.validateTarget(target)) {
            res.json(ResponseHandler.general.missing_data({
                message: 'Invalid transfer target. Only user or wallet is allowed.',
            }));
            return false;
        }

        return true;
    };

    const validateValuesDelete = (token, type, ID, res, ResponseHandler, SessionHandler, validateToken) => {
        if (!validateToken(token)) {
            res.json(ResponseHandler.general.invalid_token_format());
            return false;
        }
        if (!SessionHandler.checkUser(token)) {
            res.json(ResponseHandler.general.access_denied());
            return false;
        }

        if (!TransfersHelper.validateType(type, true)) {
            res.json(ResponseHandler.general.missing_data({
                message: 'Invalid transfer type. Only income or spending.',
            }));
            return false;
        }
        if (!ID || typeof ID !== 'number') {
            return false;
        }

        return true;
    };

    return {
        validateTarget,
        validateType,
        validateTransfer,
        validateValuesGet,
        validateValuesAdd,
        validateValuesDelete,
        parseTransersForReturn,
    };
})();

module.exports = TransfersHelper;
