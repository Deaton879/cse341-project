//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

// For core requirements
const userArray = ['Dallas', 'Marcus', 'Steve', 'Alex'];
// For core requirements

// For stretch requirements
let error = 0;
// For stretch requirements

router.post('/addUser', (req, res, next) => {
    const newUser = req.body.newUser;

    // For stretch requirement 2
    const index = userArray.indexOf(newUser);
    if(index !== -1) {
        error = 2;

    }else {
        userArray.push(newUser);
        error = 0;
    }
    // For stretch requirement 2

    res.redirect('/ta02/');
});

router.post('/removeUser', (req, res, next) => {
    const remUser = req.body.remUser;

    const index = userArray.indexOf(remUser);
    if(index !== -1) {
        userArray.splice(index, 1);

        // For stretch requirement 1
        error = 0;
    }
    else {
        error = 1;
    }
        // For stretch requirement 1

    res.redirect('/ta02/');
});

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        users: userArray,

        // For stretch requirements
        error: error,
        // For stretch requirements

        path: '/ta02/', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        
    });
});

module.exports = router;