var express = require('express');
var router = express.Router();
var serviceForCheck = require("../service/checkLogin");
var upload = require("../service/upload");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/checkLogin",function(req, res){
	serviceForCheck.checkUserLogin(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.post("/uploadSource",function(req, res){
	var imgData = req.body.imgData;
	var fileType = req.body.fileType;
	var fileName = req.body.fileName;
	var Href = req.body.Href;
	upload.uploadSourceForImage(imgData,fileType,fileName,Href,req).then(function(result){
		res.send(result);
	}).fail(function(err){
		res.send(err);
	});
});

module.exports = router;
