const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express();

// Route setup
const prove02Routes = require('./routes/proveRoutes/prove02-routes');

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(bodyParser({extended: false}))
    .use('/', prove02Routes)
    .use('/display', prove02Routes)
    // .get('/', (req, res, next) => {
    //     res.render('pages/provePages/index', {title: "02 Prove Assignment", path: '/'});
    // })
    .post('/')
    .use((req, res, next) => {
        // 404 page
        res.status(404).send("<h1>Page Not Found");
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));