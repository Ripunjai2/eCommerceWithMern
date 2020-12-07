const express = require('express');
const router = express.Router();

const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { updateStock } = require('../controllers/product');
const { getOrderById, createOrder } = require('../controllers/order');

//params
router.param('userId', getUserById);
router.param('orderId', getOrderById);

//routes
router.post('/order/create/:userId', isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

module.exports = router;
