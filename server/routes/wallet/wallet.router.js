const express = require('express');
const WalletController = require('./wallet.controller');

const WalletRouter = express.Router();

WalletRouter.post('/all', WalletController.GetAll_POST);
WalletRouter.post('/add', WalletController.Add_POST);
WalletRouter.delete('/delete', WalletController.Delete_DELETE);
WalletRouter.post('/edit', WalletController.Edit_POST);
WalletRouter.post('/getTypes', WalletController.GetAllTypes_POST);

module.exports = WalletRouter;
