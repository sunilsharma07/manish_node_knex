// var mongoose = require('mongoose'),
//     crypto = require('crypto'),
//     Schema = mongoose.Schema,

//     connection = require('../db/connection'),
//     ED = rootRequire('services/encry_decry'),
//     DS = rootRequire('services/date'); // date services
//     var moment = require('moment');


import mongoose from "mongoose";
import crypto from "crypto";
import connection from "../../db/connection";
import moment from "moment";
var Schema = mongoose.Schema;


// model schema
var schema = new Schema({
    name: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0
        /* 1 = active, 0 = inactive, 2= deleted*/
    },
    updated_at: {
       type: Date,
       //default: DS.now()
       default: moment().toISOString()
    },
    created_at: {
       type: Date,
       //default: DS.now()
       default: moment().toISOString()
    }
}, {
    collection: 'tbl_puzzle_category'
});

schema.pre('save', function(next) {
    //var user = this;
    // if (!user.fbid) {
    //     user.password = ED.encrypt(user.password);
    // }
    //user.created_at = user.updated_at = DS.now();
    this.updated_at = moment().toISOString();
    this.created_at = moment().toISOString();
    next();
});

schema.pre('update', function(next) {
    this.update({}, { $set: { updated_at: moment().toISOString() } });
    next();
});

module.exports = connection.model(schema.options.collection, schema);
