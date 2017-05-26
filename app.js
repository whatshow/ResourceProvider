/*** 模块引用 ***/
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*** 配置引用 ***/
var libs = {
  middleware:{
    md5:  require("./Libs/MiddleWare/md5")
  }
};
var servlets = {
  md5:  require('./Servlets/ResourceMD5'),
  file: {
    list:               require("./Servlets/File/List"),
    upload:             require("./Servlets/File/Upload"),
    delete:             require("./Servlets/File/Delete")
  }
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /Resource
//app.use(favicon(path.join(__dirname, 'Resource', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*** 静态资源资源 ***/
//管理页面
app.use("/", express.static(path.join(__dirname, 'Html')));
//发送的资源
app.use("/", libs.middleware.md5, express.static(path.join(__dirname, 'Resource')));

/*** 注册所有Servlets ***/
//获取md5接口
app.use('/md5', servlets.md5);
//文件
app.use("/file/list", servlets.file.list);
app.use("/file/upload", servlets.file.upload);
app.use("/file/delete", servlets.file.delete);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.redirect("/");
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.redirect("/");
});


module.exports = app;
