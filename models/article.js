/**
 * Created by cds on 2017/1/17.
 */


var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    articleId:{ type:String,umique:true,index:true },
    title : String,
    time : String,
    content : String,
    author : String,
    good : {type:Number,default:0},
    look : {type:Number,default:0},
    kind : {type:Number}
});

module.exports = articleSchema;

