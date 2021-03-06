const express = require('express');
const router = express.Router();
const auth = require('./control/auth.js');
const landing = require('./control/landing.js');


// if the current session not contains userID redirect to login
const redirectLogin = (req,res, next) => {
    if (!req.session.userID) {
        res.redirect('/login')
    } else {
        next();
    }
}

// if the current session contains userID redirect to last path
const redirectLanding = (req,res, next) => {
    if (req.session.userID) {
        res.redirect(`/${req.session.route}`);
    } else {
        next();
    }
}


// the login routes
router.get('/', auth.GET_root);
router.get('/login',redirectLanding, auth.GET_login);
router.post('/login', auth.POST_login); //redirectLanding
router.get('/register', auth.GET_register);
router.post('/register', auth.POST_register); // redirectLanding
router.post('/logout', redirectLogin, auth.POST_logout);
router.get('/sessionOccupied', auth.GET_sessionOccupied);

// the routes after logged in
router.get('/lobby', redirectLogin, landing.GET_lobby);
router.post('/lobby', redirectLogin, landing.POST_lobby);
router.get('/highscore', redirectLogin, landing.GET_highscore);
router.get('/help', redirectLogin, landing.GET_help);
router.get('/about', redirectLogin, landing.GET_about);

// the game routes
router.get('/game', redirectLogin, landing.GET_game);
router.post('/game', redirectLogin, landing.POST_game);

module.exports = router;
