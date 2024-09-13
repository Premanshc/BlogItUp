const JWT = require('jsonwebtoken');

const secret = "Prem@n$h";

function createTokenForUser(user){
    const payLoad = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    const token = JWT.sign(payLoad, secret);
    return token;
}

function validateToken(token){
    const payLoad = JWT.verify(token, secret);
    return payLoad;
}

module.exports = {
    createTokenForUser,
    validateToken,
};
