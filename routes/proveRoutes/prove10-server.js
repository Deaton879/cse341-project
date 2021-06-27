const express = require('express')
const router = express.Router()

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../../data/prove10-data.json')

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData)
})

router.post('/insertName', (req, res, next) => {

    // Make sure the submission is not blank/undefined
    if (req.body.newName !== undefined && req.body.newName !== '') {
        const newName = req.body.newName

        // Make our submissions somewhat unique.
        if (!dummyData.avengers.some(a => a.name === newName)) {
            dummyData.avengers.push({ name: newName }) // Push new object into the dummyData
            res.sendStatus(200)
        } else {
            // Send a 403 (Forbidden) status code if name is already on the list  
            res.sendStatus(403) 
        }
    } else {  
        // Send a 400 (Bad Request) status code   
        res.sendStatus(400) 
    }
})

router.get('/', (req, res, next) => {
    res.render('pages/provePages/prove10', {
        title: 'Prove Assignment 10',
        path: '/provePages/prove10'
    })
})

module.exports = router