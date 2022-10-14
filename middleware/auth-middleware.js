const jwt = require('jsonwebtoken');
const userDB = require('../models/user');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인이 필요한 페이지 입니다.',
        });
        return;
    }
    try {
        const { userId } = jwt.verify(tokenValue, 'yushin-secret-key');
        const user = userDB.findById(userId);
        if(!user)
            res.status(401).send({ errorMessage: '로그인이 필요한 페이지 입니다.'});
        res.locals.user = user;
        next();
    } catch (error) {
        res.status(401).send({ errorMessage: '로그인이 필요한 페이지 입니다.' });
        return;
    }
};