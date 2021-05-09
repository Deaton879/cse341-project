const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('pages/projectPages/add-product', {
        title: "Add a new product",
        path: '/add-product',
        projectCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.price, req.body.desc, req.body.img);
    product.save();
    res.redirect('/shop');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('pages/projectPages/shop', {
            prods: products,
            title: 'Shop',
            path: '/shop',
            hasProducts: products.length > 0,
            activeShop: true,
            projectCSS: true
        });
    });
};