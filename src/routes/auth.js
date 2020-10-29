const User = require('../models/User');
const AuthCtrl = require('../controllers/auth.controllers')
const isEmailExist = require('../middlewares/register')

const { Router } = require('express');

const router = Router();

router.post('/login', AuthCtrl.signIn);

router.post('/register', isEmailExist, AuthCtrl.register);

module.exports = router;