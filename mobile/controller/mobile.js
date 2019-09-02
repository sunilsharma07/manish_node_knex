// var crypto = require('crypto');
// var util = require('util');
// var async = require('async');
// var multiparty = require("multiparty");
// var fs = require('fs');
// var http = require('http');
// var url = require('url');
// var mysql = require('mysql');
// var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var md5 = require("MD5");
// var dateTime = require('date-time');
// var path = require('path');
// var Promise = require('bluebird');
// var _ = require('underscore');
// var config_mysql = rootRequire('config/global_mysql.js');
// var knex = require('knex')(config_mysql);


import crypto from "crypto";
import util from "util";
import async from "async";
import multiparty from "multiparty";
import fs from "fs";
import http from "http";
import url from "url";
import mysql from "mysql";
import jwt from "jsonwebtoken";
import md5 from "MD5";
import dateTime from "date-time";
import path from "path";
import underscore from "underscore";
import knex from "knex";

import PuzzleSchema from "../models/Puzzle";



// get host name
function get_hostname() {
   
    return 'manish';
}


var mobile = {

    login : function(req, res, next)
    { 
          let aa = get_hostname();

          console.log(aa);   

        return res.status(200).json({ success: '1', message: 'Manish sharma very good boy dear'});     
    },

    get_login : function(req, res, next)
    {
        return res.status(200).json({ success: '1', message: 'Get Login Done !'});     
    },
    add_puzzle_category: function(req, res) {

        async.waterfall([
           function(nextCall) { // check required parameters
                req.checkBody('name', 'Name is required').notEmpty(); // Name is required

                var error = req.validationErrors();
                if (error && error.length) {
                    return nextCall({ message: error[0].msg });
                }
                nextCall(null, req.body);
            },
            function (body, nextCall) {
                var category = new PuzzleCategorySchema(body);
                 category.save(function (error, result) {
                    // console.log('user', user.length);
                    if (error) {
                        return nextCall({ "message": error });
                    }
                    nextCall(null, {
                        status: 200,
                        message: 'Puzzle Catgory add succesfully.',
                        data: result
                    });

                });
            }
        ], function(err, response) {
            if (err) {
                debug('Category Error', err);
                return res.sendToEncode({ status: 400, message: (err && err.message) || "Oops! You could not be logged in." });
            }

            res.sendToEncode(response);
        });
    },


 
};

module.exports = mobile;

//export default mobile;
