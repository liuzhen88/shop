var q = require('q');
var config = require('../config/config');
var bannerModel = require("../schema/staicUploadImg");
var newsSchema = require('../schema/newsSchema');

function renderIndex(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.index.title;
	context.router = 'index';
	deferred.resolve(context);

	return deferred.promise;
}

function renderProductCenter(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.productCenter.title;
	context.router = 'productCenter';
	deferred.resolve(context);

	return deferred.promise;
}

function renderDownload(req, res){
	var deferred = q.defer();
	var context = {};
	var list = config.list;
	context.title = config.download.title;
	context.router = 'download';
	context.list = list;
	deferred.resolve(context);

	return deferred.promise;
}

function renderSupport(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.support.title;
	context.router = 'support';
	deferred.resolve(context);

	return deferred.promise;
}

function renderContact(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.support.title;
	context.router = 'contact';
	deferred.resolve(context);

	return deferred.promise;
}

function renderAbout(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.support.title;
	context.router = 'about';
	getNewsData(function(err,docs){
		if(err){
			deferred.reject(err);
		}else{
			context.data = docs;
			deferred.resolve(context);
		}
	});
	return deferred.promise;
}

function checkSession(req , res, next){
	if(!req.session.user){
		res.redirect("/login");
		return;
	}
	getBannerData(function(bannerData){
		var data = {
			logoUrl:"/images/logo.png",
			this_position:"",
			list:[
				"首页广告图",
				"产品中心",
				"文档下载",
				"技术支持",
				"关于我们"
			],
			bannerImageData:bannerData
		}
		next(data);
	});
}

function checkSessionByAbout(req, res, next){
	if(!req.session.user){
		res.redirect("/login");
		return;
	}
	var data = {
		logoUrl:"/images/logo.png",
		this_position:"",
		list:[
			"首页广告图",
			"产品中心",
			"文档下载",
			"技术支持",
			"关于我们"
		]
	}
	next(data);
}

function checkSessionByProductCenter(req, res, next){
	if(!req.session.user){
		res.redirect("/login");
		return;
	}
	var data = {
		logoUrl:"/images/logo.png",
		this_position:"",
		list:[
			"首页广告图",
			"产品中心",
			"文档下载",
			"技术支持",
			"关于我们"
		]
	}
	next(data);
}

function getBannerData(cb){
	bannerModel.findOne({
		"type":"banner"
	},function(err,docs){
		if(err){
			console.log("search banner data is error:"+error);
			return;
		}
		cb(docs);
	});
}

function getNewsData(callback){
	newsSchema.find({}).sort({
		"timeStr":-1
	}).exec(function(err,docs){
		if(err){
			console.log(err);
			callback(err);
			return;
		}
		callback('',docs);
	});
}

module.exports = {
	renderIndex:renderIndex,
	renderProductCenter:renderProductCenter,
	renderDownload:renderDownload,
	renderSupport:renderSupport,
	renderContact:renderContact,
	renderAbout:renderAbout,
	checkSession:checkSession,
	checkSessionByAbout:checkSessionByAbout,
	checkSessionByProductCenter:checkSessionByProductCenter
}