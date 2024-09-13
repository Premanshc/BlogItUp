const express = require('express');
const User = require('../models/user');
const {createTokenForUser} = require('../services/auth');

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
    try{
        const {email, password} = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);

    res.cookie("token", token).redirect('/');
    }catch(error){
        res.render('signin',{
            error: error.message,
        })
    }
};

module.exports = {
    handleUserSignUp,
    handleUserSignin
};