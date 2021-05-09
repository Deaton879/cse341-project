// Import the path module
const path = require('path');

// Import express, create a router
const express = require('express');
const router = express.Router();

// Import the products controller to handle the shop product pages
const productsController = require('../../controllers/products');

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;