const express = require("express");
const userController = require("../controller/user")
const userRouter = express.Router();

// 회원가입
userRouter.post('/signup', userController.newUser);

// 로그인
userRouter.get('/login', userController.login);

// 계정 확인(토큰 발급용)
userRouter.get('/checkme', userController.checkMe);

module.exports = userRouter;