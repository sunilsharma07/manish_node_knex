// var debug = require('debug')('x-code:v1:db:connection'),
//     mongoose = require('mongoose'),
//     mysql = require('mysql'),
//     config = rootRequire('./config/global.js'),
//     connection;


import mongoose from 'mongoose'
import mysql from 'mysql'
//import config from './config/global.js'

import config from '../config/global.js'




// DB configuration
if (config.database.use === 'mongodb') 
{
    connection = mongoose.createConnection(config.database.mongoURL); // database name
    //connection.on('error', debug.bind(debug, 'connection error:'));

}
else {
	debug('Failed to connect with db');
}

module.exports = connection;


