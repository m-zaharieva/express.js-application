const router = require('express').Router();

const homeService = require('./../services/homeService.js');


const home = (req, res, next) => {
    res.render('home');
}



router.get('/', home);



module.exports = router;