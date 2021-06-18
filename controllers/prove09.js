exports.getPage = (req, res, next) => {
    res.render('pages/provePages/prove09.ejs', {
        title: "Pokemon",
        path: '/prove09'
    });
};