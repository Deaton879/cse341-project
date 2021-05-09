exports.get404 = (req, res, next) => {
    res.status(404).render('pages/projectPages/errorPage', { title: 'Page Not Found', path: '/errorPage' });
};