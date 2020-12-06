const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, getAllUniqueCategories } = require('../controllers/product');

//params
router.param('userId', getUserById);
router.param('productId', getProductById);

//Routes
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct);
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);
router.get('/product/products', getAllProducts);
router.delete('/prouct/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct);
router.put('/prouct/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct);
router.get('/product/categories', getAllUniqueCategories);

module.exports = router;
