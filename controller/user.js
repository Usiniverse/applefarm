const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcrypt");
const user = require("../model/user");
require("dotenv").config();


const UserSchema = joi.object({
    email:
        joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]+@+[0-9a-zA-Z-.]{3,30}$')),
    
    nickname: 
        joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9$#-.@]{3,30}$')),
    
    password: 
        joi.string()
        .required()
        .min(3),
    
    confirmPassword: 
        joi.string()
        .required()
        .min(3),
});

// 회원가입
async function newUser() {
    const { 
        userId, 
        nickname, 
        email, 
        password, 
        confirmPassword, 
        phoneNumber 
    } = await UserSchema.validateAsync(req.body);

    const userIdinDatabase = await user.findOne({ userId });

    if (userId !== userIdinDatabase.userId) {
        return res.status(400).send({ errorMessage: '이미 가입한 회원입니다.', });
    }

    if (password !== confirmPassword) {
        return res.status(400).send({ errorMessage: '비밀번호와 비밀번호 확인의 내용이 일치하지 않습니다.', });
    }
   
    const existUsers = await user.findOne({email});
    if(existUsers){
       return res.status(400).send({errorMessage: '중복된 이메일입니다.',});
    }

    // false 인경우 email check X
    const existUsersNickname = await user.findOne({nickname});
    if (existUsersNickname){
       return res.status(400).send({ errorMessage: '중복된 닉네임입니다.', });
    }

    res.status(201).send({ message : "회원가입에 성공했습니다."});

    const users = new user({ 
        userId, 
        nickname, 
        email, 
        password, 
        confirmPassword, 
        phoneNumber  
    });
    await users.save();
}

// 로그인
async function login(req, res) {
    const { userId, password } = req.body;
    const user = await user.findOne({ userId });

    const userCompared = await bcrypt.compare(password, user.password);
    if(!userCompared){
        return res.status(400).send({errorMessage: "이메일이나 비밀번호가 올바르지 않습니다."})
    }

       //비밀번호까지 맞다면 토큰을 생성하기
        const id = user.userId;
        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY);
        console.log(token);
        res.status(200).send({ message : "로그인에 성공했습니다." , token });
    }

// 확인 작업
async function checkMe(req, res) {
    const { user } = res.locals;
    res.send({
        user: {
            authorId: user.authorId,
            authorName: user.authorName,
        },
    });
}

module.exports = {
    newUser,
    login,
    checkMe
}