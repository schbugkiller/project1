var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');

var config = require('./config/config.json');

var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser')

var app = express();

app.use(expressLayouts);
app.use('/bootstrap', express.static(path.join(__dirname,'views','_assets','bootstrap')));
app.use('/jquery', express.static(path.join(__dirname,'views','_assets','jquery')));
app.use('/fonts', express.static(path.join(__dirname,'views','_assets','fonts')));
app.use('/img', express.static(path.join(__dirname,'views','_assets','img')));
app.use('/custom', express.static(path.join(__dirname,'views','custom')));

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.set("layout extractScripts", true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: '#s3c*rEt!',
    cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use(passport.initialize());
app.use(passport.session());

var models = require("./models");

require('./config/passport.js')(passport,models.user);
var routes = require('./routes/index');
app.use('/',routes);

app.listen(3000);
