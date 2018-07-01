var  config = require('./config.js');
var express = require('express');
var loggers = require('morgan');
var session = require('express-session');
var router = require('./router.js')
var MongoStore = require('connect-mongo')(session);
var bodyParser          = require('body-parser');
var cookieParser = require('cookie-parser')(config.session_secret);
var app = express();
var models = require('./models');
var mongoose = require('mongoose');
var UserModel  = mongoose.model('User');

app.use(cookieParser);
app.use(loggers('dev'));
// 使用这个中间件之后才能通过req.body获取参数
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));


var connection_string = config.dbprefix + config.dbhost + '/' + config.dbname;
// console.log(connection_string);
var session = session({
  secret: config.session_secret,
  store: new MongoStore({
    url: connection_string
  }),
  resave: true,
  saveUninitialized: true,
});
app.use(session);

app.use(function(req, res, next) {
	if (config.debug && req.cookies['mock_user']) {
		var mockUser = JSON.parse(req.cookies['mock_user']);
        req.session.user = new UserModel(mockUser);
        return next();
	}
	next();
});

app.use('/', router);

//catch 404
app.use(function(req, res, next){
    let err = new Error('not found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    //获取环境
    console.log('env', req.app.get('env'));
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end(err.status);
   // res.render('error', {originalUrl: req.originalUrl});
});

app.listen(config.port, function () {
    console.log("listening on port ", config.port);
});

module.exports = app;
