const express = require('express')
const router = express.Router()

const users = ['admin'] // Dummy array for users

router.get('/', (req, res, next) => {
    res.render('pages/pr12-login', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/

    const { username } = req.body;

    // Make sure the response is not empty/missing
    if (!username || username.trim() === '') {
        return res.status(400).send({error: "You must enter a username to enter chat room."})
    }

    // Verify the username is unique
    if(users.includes(username.trim())) {
        return res.status(409).send({error: 'That username is unavailable!'});
    }

    // Add to the list and send the username back
    users.push(username.trim());
    req.session.user = username;
    res.status(200).send({ username: username.trim() });

})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
    // Render the chat page.
    res.render('pages/pr12-chat', {
        title: 'Prove Assignment 12',
        path: '/proveAssignments/12',
        // Pass in the user saved in the session
        user: req.session.user,
    });
})

module.exports = router
