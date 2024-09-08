const express = require('express');
const User = require('../models/user');

async function handleUserSignUp(req, res){
    const {fullName, email, password} = req.body;
    await User.create({
        fullName, 
        email, 
        password
    });
    return res.redirect('/user/signin');
}

module.exports = {
    handleUserSignUp,
};