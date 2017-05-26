/*** 模块引用 ***/
var path = require("path");
var fs = require("fs");
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
/*** 自定义模块 ***/
var utils = require("../../Libs/Utils");
var rh = require("../../Libs/ResponseHandler");


router.all("/", function(req, res, next) {
  var filename = req.query.filename || req.body.filename;
  //删除文件
  try{
    var status = fs.statSync(path.join(__dirname, '../../Resource/' + filename));
    if(status.isFile()){
      //删除文件
      fs.unlinkSync(path.join(__dirname, '../../Resource/' + filename));
    }
  }catch(e){}
  //无论结果如何，都重定向到列表页
  res.redirect('/');
});

module.exports = router;