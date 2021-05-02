const express = require('express');
//const fs = require('fs');
const router = express.Router();

const bookSummaries = [];

router.post('/display', (req, res, next) => {
    const title = req.body.title;
    const summary = req.body.summary;

    var book = {
        "bookTitle" : "bookSummary"
    };

    book.bookTitle = title;
    book.bookSummary = summary;

    bookSummaries.push(book);
    
    res.render('pages/provePages/display', {
        title: 'Best Sellers List',
        summaries: bookSummaries,

        path: '/prove02/display',
        contentCSS: true
    });
    res.redirect('pages/provePages/display');
    
});

router.get('/', (req, res, next) => {
    res.render('pages/provePages/prove02', {
        title: '02 Prove Assignment',
        summaries: bookSummaries,

        path: '/prove02/',
        contentCSS: true

    });
});

module.exports = router;