const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const createUser = require('../controllers/userCtrl').createUser;
const loginUser = require('../controllers/userCtrl').loginUser;

const userRouter = express.Router();

userRouter.post('/register',createUser)

userRouter.post('/login',loginUser);

module.exports = userRouter;