const User = require('../models/User');
const AuthCtrl = require('../controllers/auth.controllers')
const isEmailExist = require('../middlewares/register')

const { Router } = require('express');
const verifyToken = require('../middlewares/validate-token');

const router = Router();

router.post('/login', AuthCtrl.signIn);

router.post('/register', isEmailExist, AuthCtrl.register);

router.get('/data', verifyToken, AuthCtrl.getDataUserbyToken);

module.exports = router;