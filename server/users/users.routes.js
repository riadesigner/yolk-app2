const express = require('express')
const crypto = require('crypto');
const UserService = require('./users.service')

const router = express.Router();

const passportLocal = require('../libs/pass-local')
passportLocal.init(router,'email','password');

// ...

module.exports = router;