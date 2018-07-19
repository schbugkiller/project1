var express = require('express');
var passport = require('passport');
var viewController = require('../controllers/viewController');
var authController = require('../controllers/authController')

var router = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
};

var isNotAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated())
    return next();
  res.redirect('/');
};

router.get('/', viewController.indexView);


router.get('/signup', isNotAuthenticated,viewController.signupView);

router.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup'
        }));


router.get('/login', isNotAuthenticated, viewController.loginView);
router.post('/login',passport.authenticate('local-login', {
            successRedirect: '/userInfo',
            failureRedirect: '/404'
}));

router.get('/logout', function(req, res){
  req.session.destroy(function(err) {
    res.redirect('/');
  })
});

router.get('/userInfo',isAuthenticated,viewController.userInfoView);
router.get('/emailVerification', isAuthenticated,function(req, res){
  res.render('emailVerification');
});
router.post('/emailVerification', isAuthenticated, authController.emailVerification);
router.get('/auth/emailVerification/', isAuthenticated, authController.emailTokenVerification);

router.get('/404', viewController.pageNotFoundView);

router.get('/login/kakao',
  passport.authenticate('kakao', {
    successRedirect: '/userInfo',
    failureRedirect: '/login'
  })
);

router.get('/login/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: '/userInfo',
    failureRedirect: '/login'
  })
);

router.get('/login/naver',
  passport.authenticate('naver', {
    successRedirect: '/userInfo',
    failureRedirect: '/login'
  })
);

router.get('/login/naver/callback',
  passport.authenticate('naver', {
    successRedirect: '/userInfo',
    failureRedirect: '/login'
  })
);

router.get('/login/google',
  passport.authenticate('google', {
    successRedirect: '/userInfo',
    failureRedirect: '/login',
    scope:'https://www.googleapis.com/auth/plus.login'
  })
);

router.get('/login/google/callback',
  passport.authenticate('google', {
    successRedirect: '/userInfo',
    failureRedirect: '/login'
  })
);

module.exports = router;
