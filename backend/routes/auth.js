var express = require('express');
var router = express.Router();
const { signout } = require('../controllers/auth');
const { signup } = require('../controllers/auth');

router.get('/signout', signout);
router.post('/signup', signup);

module.exports = router;
