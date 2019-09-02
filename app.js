// global.rootRequire = function(name) {
//     return require(__dirname + '/' + name);
// }



// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var verifyToken = require('./middleware/verifyToken.js');
// var mysql = require('mysql');
// var expressValidator = require('express-validator');
// var http = require('http');
// var fs = require('fs');
// var util = require('util');
// var app = express();
// var mobile = require('./mobile/routes/route');


import express from "express";
import path from "path";
import servefavicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import verifyToken from "./middleware/verifyToken.js";
import mysql from "mysql";
import expressValidator from "express-validator";
import http from "http";
import fs from "fs";
import util from "util";
import mobile from "./mobile/routes/route";
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(expressValidator({
 customValidators: {
   	gte: function(param, num) {
        return param >= num;
    }  
 }
}));



//app.listen(3003);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', mobile);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, user-access-token");
    res.header('Access-Control-Allow-Methods', "POST, GET, PUT, DELETE, OPTIONS");
    next();
});



//app.use('/api/v1/', mobile);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


//module.exports = app;

export default app;
