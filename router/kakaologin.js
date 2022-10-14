const express = require("express");
const passport = require("passport");
const kakaoRouter = express.Router();

// 카카오 로그인
kakaoRouter.get('/kakao', passport.authenticate('kakao'));

kakaoRouter.get('/kakao/callback', passport.authenticate('kakao'));

module.exports = kakaoRouter;