const express = require('express');
const UserRouter = require('./user/user.router');
const WalletRouter = require('./wallet/wallet.router');
const TransfersRouter = require('./transfers/transfers.router');
const IndexRouter = express.Router();

IndexRouter.use('/user', UserRouter);
IndexRouter.use('/wallet', WalletRouter);
IndexRouter.use('/transfers', TransfersRouter);

module.exports = IndexRouter;
