/**
 * Created by Frederick on 22/03/2016.
 */
var config = require('./config'),
    session = require("express-session"),
    express = require("express"),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    methodOverride = require('method-override'),
    passport = require('passport');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/articles.server.routes.js')(app);
    require('../app/routes/favours.server.routes.js')(app);
    app.use(express.static('./public'));

    return app;
};