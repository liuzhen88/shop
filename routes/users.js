var express = require('express');
var router = express.Router();
var serviceForCheck = require("../service/checkLogin");
var upload = require("../service/upload");
var newsService = require('../service/newsService');
var productCenterService = require('../service/productCenterService');
var documentDownloadService = require('../service/documentDownloadService');
var supportService = require('../service/supportService');

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

router.get("/exitLogin",function(req, res){
	serviceForCheck.exitLogin(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.post('/saveNews',function(req,res){
	newsService.saveNews(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.post('/saveProductData',function(req,res){
	productCenterService.saveProductData(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.post('/saveNewProductClass',function(req,res){
	productCenterService.saveNewProductClass(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.post('/saveDownloadDocument',function(req,res){
	documentDownloadService.saveDownloadDocument(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.post('/savehandlebook',function(req,res){
	documentDownloadService.savehandlebook(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.post('/saveDownloadsClass',function(req,res){
	documentDownloadService.saveDownloadsClass(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.post('/saveSupportArticle',function(req,res){
	supportService.saveSupportArticle(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.post('/loadProductNamerule',function(req,res){
	supportService.loadProductNamerule(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

router.get('/getProductClassDataById',function(req, res){
	productCenterService.getProductClassDataById(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

module.exports = router;
