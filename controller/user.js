import passport from "passport";
import KakaoStrategy from "passport-kakao";

require("dotenv").config();

new KakaoStrategy({
    clientID : process.env.KAKAO_CLIENT_ID,
    callbackURL : '/auth/kakao/callback'
})

const kakaoCallback = (req, res, next) => {
    // try {
      passport.authenticate(
        "kakao",
  
        { failureRedirect: "/" },
        (err, users, info) => {
          console.log("여기가 문제가 발생하나요?(여긴 콜백함수입니다!)");
          if (err) return next(err);
          //----------------------------------------------------------------
          const { userId, nickname, email } = users;
          const token = jwt.sign({ userId }, process.env.KAKAO_CLIENT_ID, {
            expiresIn: "24h",
          });
  
          result = {
            userId,
            token,
            nickname,
            email,
          };

          res.send({ users: result });
        }
      )(req, res, next);
    // } catch (error) {
    //   res.status(400).send({ errorMessage: "카카오 로그인 실패" });
    // }
  };


module.exports = { kakaoCallback };