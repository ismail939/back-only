const express = require('express')
const login_registerController = require('../controllers/login_registerController')

const router = express.Router();

router.route('/login')
    .post(login_registerController.get)

router.route('/register')
    .post(login_registerController.create)


module.exports = router