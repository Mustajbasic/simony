const express = require('express');
const TransfersController = require('./transfers.controller');

const TransfersRouter = express.Router();

TransfersRouter.post('/add', TransfersController.add_POST);
TransfersRouter.post('/getAllCategories', TransfersController.getAllCategories_POST);
TransfersRouter.post('/getAll', TransfersController.getAll_POST);
TransfersRouter.post('/getPage', TransfersController.getPage_POST);
TransfersRouter.post('/getFromTo', TransfersController.getFromTo_POST);
TransfersRouter.post('/edit', TransfersController.edit_POST);
TransfersRouter.delete('/delete', TransfersController.delete_DELETE);

module.exports = TransfersRouter;
