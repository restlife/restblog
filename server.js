/**
 * Created by Administrator on 2017/1/8.
 */
/**
 * Created by cds on 2016/12/7.
 */
var swig  = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./public/js/app');
var _ = require('underscore');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
/*var config = require('./config');*/
var articleSchema = require('./models/article');


app.set('port', process.env.PORT || 3067);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));

var db = mongoose.connect("mongodb://127.0.0.1:27017/restblog");
db.connection.on("error", function (error) {
    console.log("失败" + error);
});
db.connection.on("open", function () {
    console.log("------成功------");
});

var articleModel = db.model("articleList",articleSchema);

app.post('/addArticle',function(req, res, next){
    var doc ={
        title : req.body.title,
        time : req.body.time,
        kind : req.body.kind,
        content : req.body.content,
        author : 'RestLife'
    }
    new articleModel(doc).save(doc,function(error){
        if(error){
            console.log(error);
        }else{
            console.log('save ok');
        }
    });
});
app.post('/addGood',function(req, res, next){
       var doc ={
            nodeId : req.body.nodeId
        };
        var upData = { $inc :{ good : 1 }},options = { new : true };
        articleModel.update({ _id : doc.nodeId},upData,function(error,data){
            if(error) {
                console.log(error);
            } else {
                res.send(data);
                console.log('Update success!');
            }
        })
});
app.post('/homePage',function(req,res,next){
    var limit = parseInt(req.body.limit);
    var pageNum = parseInt(req.body.pageNum);
    var pageKind = parseInt(req.body.kind) || {$in:[1,2]};
    articleModel.count({kind:pageKind},function(err,count){
        articleModel.find({kind:pageKind},function(err,data){
            res.send({data,count});
        }).limit(limit).skip(limit*pageNum).sort({_id: -1});
    });
});

app.use(function(req, res,next) {
    Router.run(routes, req.path, function(Handler) {
        var html = React.renderToString(React.createElement(Handler));
        var page = swig.renderFile('./views/index.html', { html: html });
        res.send(page);
    });
    next();
});



var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
    onlineUsers++;

    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

    socket.on('disconnect', function() {
        onlineUsers--;
        io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    });
});

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});