// Import the path module
const path = require('path');

// Import express, create a router
const express = require('express');
const router = express.Router();

// Import the products controller to handle the shop product pages
const productsController = require('../../controllers/products');

// 
router.get('/', productsController.getProducts);
module.exports = router;