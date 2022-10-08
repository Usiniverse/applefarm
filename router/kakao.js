import express from "express";
import passport from "passport";

const userRouter = express.Router();

// 카카오 로그인
userRouter.get('/kakao', passport.authenticate('kakao'));

userRouter.get('/kakao/callback', passport.authenticate('kakao'));

export { userRouter };