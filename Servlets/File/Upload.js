/*** 模块引用 ***/
var path = require("path");
var fs = require("fs");
var multiparty = require('multiparty');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
/*** 自定义模块 ***/
var utils = require("../../Libs/Utils");
var rh = require("../../Libs/ResponseHandler");


router.all("/", function(req, res, next) {
  var form = new multiparty.Form();
  form.uploadDir = path.join(__dirname, '../../Resource/');
  form.parse(req, function(err, fields, files) {
    //重命名文件
    fs.renameSync(
      files.file[0].path,
      path.join(__dirname, '../../Resource/' + files.file[0].originalFilename)
    );
  });
  res.redirect("/");
});

module.exports = router;