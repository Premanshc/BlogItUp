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

async function handleUserSignin(req, res){
    const {email, password} = req.body;
    const user = await User.matchPassword(email, password);

    res.redirect('/');
};

module.exports = {
    handleUserSignUp,
    handleUserSignin
};