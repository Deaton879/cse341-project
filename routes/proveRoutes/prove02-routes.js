const express = require('express');
const fs = require('fs');
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

        path: '/display/',
        contentCSS: true
    });

    
});

router.get('/', (req, res, next) => {
    res.render('pages/provePages/index', {
        title: '02 Prove Assignment',
        summaries: bookSummaries,

        path: '/index/',
        contentCSS: true

    });
});

module.exports = router;