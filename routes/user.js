const express = require('express');

const router = express.Router();

const { handleUserSignUp } = require('../controllers/user');

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post('/signup', handleUserSignUp);

module.exports = router;