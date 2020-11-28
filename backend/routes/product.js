const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getProductById, createProduct } = require('../controllers/product');

//params
router.param('userId', getUserById);
router.param('productId', getProductById);

//Routes
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct);

module.exports = router;
