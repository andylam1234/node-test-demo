var  config = require('./config.js');
var express = require('express');
var loggers = require('morgan');
var session = require('express-session');
var bodyParser          = require('body-parser');
var cookieParser = require('cookie-parser')(config.session_secret);
var app = express();
const rp = require('request-promise');
const route = express.Router();

app.use(cookieParser);
app.use(loggers('dev'));
// 使用这个中间件之后才能通过req.body获取参数
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

let userId = 1;
app.use('/buy', function(req, res){
    userId++;
    console.log('userId', userId);
    res.end('' + userId);
    let options = {
        method: 'POST',
        uri: `http://127.0.0.1:3000/buy`,
        body: {
            userId: userId
        },
        json: true // Automatically stringifies the body to JSON
    };
    console.log(options);
    rp(options).then(function(ret){
        console.log('ret:%j', ret);
        res.end(ret);
    }).catch(function(e){
       console.log('err:', e.message);
       res.end(e.message);
    });
});


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
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end(err.message);
   // res.render('error', {originalUrl: req.originalUrl});
});

app.listen(3002, function () {
    console.log("listening on port ", 3002);
});

module.exports = app;
