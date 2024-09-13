const express = require('express');

const router = express.Router();

const { handleUserSignUp, handleUserSignin } = require('../controllers/user');

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/logout', (req, res)=>{
    res.clearCookie('token').redirect('/');
})

router.post('/signin', handleUserSignin);

router.post('/signup', handleUserSignUp);

module.exports = router;