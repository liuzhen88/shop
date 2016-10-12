var q = require('q');
var config = require('../config/config');
var bannerModel = require("../schema/staicUploadImg");
var newsSchema = require('../schema/newsSchema');
var productCenterSchema = require('../schema/productCenterSchema');
var documentDownloadSchema = require('../schema/documentDownloadSchema');
var handleBookSchema = require("../schema/documentsSchema");
var supportSchema = require('../schema/supportSchema');
var rule = require('../schema/productNameRuleSchema');

var limitNum = 14;

function renderIndex(req, res){
	var deferred = q.defer();
	getBanner()
	.then(function(data){
		return getProductCenter(data)
	})
	.then(function(result){
		return getNews(result);
	})
	.then(function(sendData){
		sendData.title = config.index.title;
		sendData.router = 'index';
		deferred.resolve(sendData);
	})
	.fail(function(err){
		deferred.reject(err);
	});
	return deferred.promise;
}

//banner promise

function getBanner(){
	var context = {};
	var deferred = q.defer();
	bannerModel.findOne({
		'type':'banner'
	}).exec(function(err,docs){
		if(err){
			console.log(err);
			deferred.reject(err);
		}else{
			context.bannerData = docs;
			deferred.resolve(context);
		}
	});

	return deferred.promise;
}

function getProductCenter(data){
	var deferred = q.defer();
	productCenterSchema.find({}).exec(function(err,docs){
		if(err){
			console.log(err);
			deferred.reject(err);
		}else{
			data.productCenter = docs;
			deferred.resolve(data);
		}
	});

	return deferred.promise;
}

function getNews(data){
	var deferred = q.defer();
	newsSchema.find({}).sort({
		"timeStr":-1
	}).exec(function(err,docs){
		if(err){
			console.log(err);
			deferred.reject(err);
		}else{
			data.news = docs;
			deferred.resolve(data);
		}
	});

	return deferred.promise;
}

function getProducts(req, res){
	var deferred = q.defer();
	productCenterSchema.find({}).exec(function(err,docs){
		if(err){
			deferred.reject(err);
		}else{
			deferred.resolve(docs);
		}
	});

	return deferred.promise;
}

function renderProductCenter(req, res){
	var deferred = q.defer();
	getProducts(req,res).then(function(datas){
		var context = {};
		context.title = config.productCenter.title;
		context.router = 'productCenter';
		context.data = datas;
		console.log(context);
		deferred.resolve(context);
	}).fail(function(err){
		deferred.reject(err);
	});

	return deferred.promise;
}

function renderDownload(req, res){
	var deferred = q.defer();
	var context = {};
	var list = config.list;
	downloadNeedData(function(err,explainDocuments,handleBooks){
		context.title = config.download.title;
		context.router = 'download';
		context.list = list;
		context.explainDocuments = explainDocuments;
		context.handleBooks = handleBooks;
		console.log(context);
		deferred.resolve(context);
	});

	return deferred.promise;
}

function downloadNeedData(callback){
	documentDownloadSchema.find({}).exec(function(err,explain){
		if(err){
			console.log(err);
			callback(err);
		}else{
			handleBookSchema.find({}).exec(function(err,handle){
				if(err){
					console.log(err);
					callback(err);
				}
				callback('',explain,handle);
			});
		}
	});
}

function renderSupport(req, res){
	var deferred = q.defer();
	getsupportSchemaData(function(err,data,ruleData){
		var context = {};
		context.title = config.support.title;
		context.router = 'support';
		context.supportData = data;
		context.rules = ruleData;
		console.log(context);
		deferred.resolve(context);
	});

	return deferred.promise;
}

function getsupportSchemaData(callback){
	supportSchema.find({
		"name":"technical_support_article"
	}).exec(function(err,docs){
		if(err){
			console.log(err);
			callback(err);
		}else{
			rule.find({
				"name":"product_name_rule"
			}).exec(function(err,ruleData){
				if(err){
					console.log(err);
					callback(err);
				}else{
					callback('',docs,ruleData);
				}
			});
			
		}
	});
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
	getNewsData(function(err,docs,lens){
		if(err){
			deferred.reject(err);
		}else{
			context.data = docs;
			var len = Math.ceil(lens/limitNum)
			context.total = len;
			console.log(context);
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

function checkSessionByDownload(req, res, next){
	if(!req.session.user){
		res.redirect("/login");
		return;
	}
	getExplainData(function(err,classTypes){
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
			classType:classTypes
		};
		next(data);
	});
}

function checkSessionByProductCenter(req, res, next){
	if(!req.session.user){
		res.redirect("/login");
		return;
	}
	getProductCenterData(function(err,productClass){
		if(err){
			console.log(err);
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
			],
			productClass:productClass
		}
		next(data);
	});
}

function checkSessionByAddProductClass(req, res, next){
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

function checkSessionByAddDownloadClass(req, res, next){
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
	}).limit(limitNum).exec(function(err,docs){
		if(err){
			console.log(err);
			callback(err);
			return;
		}
		newsSchema.find({}).exec(function(err,result){
			if(err){
				console.log(err);
				callback(err);
				return;
			}
			callback('',docs,result.length);
		})
	});
}

function getProductCenterData(callback){
	productCenterSchema.find({}).exec(function(err,docs){
		if(err){
			callback(err);
		}
		var productClass = [];
		docs.forEach(function(value,index){
			productClass.push(value.productClass);
		});
		callback('',productClass);
	});
}

function getExplainData(callback){
	documentDownloadSchema.find({}).exec(function(err,docs){
		if(err){
			console.log(err);
			callback(err);
		}
		var classType = [];
		docs.forEach(function(value,index){
			classType.push(value.classType);
		});
		callback('',classType);
	});
}

function checkSessionBySupport(req, res, next){
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

//news
function renderNewsDetail(req, res){
	var deferred = q.defer();
	var id = req.query.id;
	newsSchema.findOne({
		"_id":id
	},function(err,docs){
		if(err){
			console.log(err);
			deferred.reject(err);
		}else{
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
				news:docs
			};
			console.log(data);
			deferred.resolve(data);
		}
	});

	return deferred.promise;
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
	checkSessionByProductCenter:checkSessionByProductCenter,
	checkSessionByAddProductClass:checkSessionByAddProductClass,
	checkSessionByDownload:checkSessionByDownload,
	checkSessionByAddDownloadClass:checkSessionByAddDownloadClass,
	checkSessionBySupport:checkSessionBySupport,
	renderNewsDetail:renderNewsDetail
}