var models = require('../models');
var PodCast = models.podCast;

exports.indexView = function(req, res) {
  res.render('index', {
    isAuthenticated: req.isAuthenticated()
  });
};

exports.podcastItemView = function(req, res) {
  res.render('./podCastItem',{
    isAuthenticated: req.isAuthenticated()
  });
};

exports.signupView = function(req, res) {
  res.render('./user/signup',{
    isAuthenticated: req.isAuthenticated()
  });
};

exports.loginView = function(req, res) {
  res.render('./user/login', {
    isAuthenticated: req.isAuthenticated()
  });
};

exports.userInfoView = function(req, res) {
  var _username = req.user.username;
  _username = _username.split('@')[0];

  res.render('./user/userInfo', {
    username: _username,
    isAuthenticated: req.isAuthenticated()
  });
};

exports.pageNotFoundView = function(req, res) {
  res.render('./404',{
    isAuthenticated: req.isAuthenticated()
  });
};

exports.podcastListView = function(req, res) {
  // default : 그냥 팟캐스트 목록
  res.render('./podcastList',{
    isAuthenticated: req.isAuthenticated()
  })
};

exports.adminView = function(req, res) {
  // default : 그냥 팟캐스트 목록
  res.render('./admin',{
    isAuthenticated: req.isAuthenticated()
  })
};

exports.adminTestView = function(req, res,next) {
  var _data = [];
  PodCast.findAll().then((data) => {
    res.render("./admin0",{
      posts: data,
      isAuthenticated: req.isAuthenticated()
    })
  });

};
