const express = require('express');
const UserController = require('./user.controller');

const UserRouter = express.Router();

UserRouter.post('/login', UserController.Login_POST);
UserRouter.post('/logout', UserController.Login_POST);
UserRouter.post('/register', UserController.Register_POST);
UserRouter.post('/edit', UserController.Edit_POST);

module.exports = UserRouter;
