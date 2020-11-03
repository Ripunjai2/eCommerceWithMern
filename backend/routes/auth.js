var express = require('express');
var router = express.Router();
//const { signout } = require('../controllers/auth');
//const { signup } = require('../controllers/auth');
const { signup, signin, signout } = require('../controllers/auth');

const { check, validationResult } = require('express-validator');

router.get('/signout', signout);
router.post('/signup', [check('name').isLength({ min: 3 }).withMessage('Name should be of minimum 3 letters'), check('email').isEmail().withMessage('It should be a valid email'), check('password').isLength({ min: 6 }).withMessage(`Password should be of minimum 6 letter`)], signup);
router.post('/signin', [check('email').isEmail().withMessage('It should be a valid email'), check('password').isLength({ min: 6 }).withMessage(`Password should be of minimum 6 letter`)], signin);
module.exports = router;
