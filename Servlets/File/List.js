/*** 模块引用 ***/
var path = require("path");
var fs = require("fs");
var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var async = require('asyncawait/async');
var await = require('asyncawait/await');
/*** 自定义模块 ***/
var utils = require("../../Libs/Utils");
var config = require("../../Config/server");
var rh = require("../../Libs/ResponseHandler");


/**
 * 读取一个文件的md5
 * @filename
 */
function GetFileMd5(filename){
  return new Promise(function(resolve, reject){
    //获取文件路径
    var filepath = path.join(__dirname, '../../Resource/' + filename);
    //检查文件是否存在 & 不是文件夹
    try{
      var status = fs.statSync(filepath);
      if(!status.isFile()){
        //不是文件
        reject(filename + "不是文件");
      }else{
        //是文件，获取md5加密结果
        var stream = fs.createReadStream(filepath);
        var hash = crypto.createHash('md5');
        stream.on('data', hash.update.bind(hash));
        stream.on('end', function () {
          resolve(hash.digest('hex'));
        });
      }
    }catch(e){
      reject(e);
    }
  });
}


router.all("/", function(req, res, next) {
  var filelist = [];
  try{
    //获取所有文件
    var files = fs.readdirSync(path.join(__dirname, '../../Resource'));
    //循环读取
    (async(function(){
      //读取文件列表
      for(var i = 0; i < files.length; i++){
        try{
          var md5 = await(GetFileMd5(files[i]));
          //读取到md5，增加一条记录
          filelist.push({
            filename:               files[i],
            url:                    config.hostprefix + "/" + files[i],
            md5:                    md5
          });
        }catch(e){}
      }
      //遍历结束，输出文件
      rh(res, 200, null, "获取到了文件列表", null, filelist);
    }))();
  }catch(e){
    //执行失败，返回400
    rh(res, 400, null, "无法读取文件列表", null, e);
  }
});

module.exports = router;