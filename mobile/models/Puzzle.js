// var mongoose = require('mongoose'),
//     crypto = require('crypto'),
//     Schema = mongoose.Schema,
//     connection = require('../db/connection'),
//     var moment = require('moment');


import mongoose from "mongoose";
import crypto from "crypto";
import connection from "../../db/connection";
import moment from "moment";

var Schema = mongoose.Schema;

// model schema
var schema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'tbl_puzzle_category'
    },
    name: {
        type: String,
        required: true
    },
    pgnFile: {
        type: String,
        default: ''
    },
    downloadFile_pgn : {
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
    collection: 'tbl_puzzle'
});

schema.pre('save', function(next) {
    var user = this;
    this.updated_at = moment().toISOString();
    this.created_at = moment().toISOString();
    next();
});

schema.pre('update', function(next) {
    this.update({}, { $set: { updated_at: moment().toISOString() } });
    next();
});

module.exports = connection.model(schema.options.collection, schema);
