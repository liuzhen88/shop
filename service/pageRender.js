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
			if(docs.length>5){
				var arr = [];
				for(var i=0;i<5;i++){
					arr.push(docs[i]);
				}
				data.news = arr;
			}else{
				data.news = docs;
			}
			//data.news = docs;
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
	context.title = config.contact.title;
	context.router = 'contact';
	deferred.resolve(context);

	return deferred.promise;
}

function renderAbout(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.about.title;
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
	newsSchema.find({}).exec(function(err,docs){
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
		}
		next(data);
	});
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

function checkSessionByManage(req, res, next){
	if(!req.session.user){
		res.redirect("/login");
		return;
	}
	var id = req.query.id;
	getExplainDataById(id,function(err,result){
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
			result:result
		};
		next(data);
	});
}

function checkSessionByHandleBook(req, res, next){
	if(!req.session.user){
		res.redirect("/login");
		return;
	}
	getHandleBook(function(err,result){
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
			result:result
		};
		next(data);
	});
}

function getHandleBook(callback){
	handleBookSchema.find({}).exec(function(err,docs){
		if(err){
			console.log(err);
			callback(err);
		}else{
			callback('',docs);
		}
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
			datas:productClass
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
		// var productClass = [];
		// docs.forEach(function(value,index){
		// 	productClass.push(value.productClass);
		// });
		callback('',docs);
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
			var obj = {
				id:value._id,
				classType:value.classType + "(" + value.downloadClassEn + ")",
			};
			classType.push(obj);
		});
		callback('',classType);
	});
}

function getExplainDataById(id, callback){
	documentDownloadSchema.findOne({
		"_id":id
	},function(err,docs){
		if(err){
			console.log(err);
			callback(err);
		}else{
			callback('',docs);
		}
	});
}

function checkSessionBySupport(req, res, next){
	if(!req.session.user){
		res.redirect("/login");
		return;
	}
	rule.find({}).exec(function(err,docs){
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
			data:docs
		}
		next(data);
	});
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
			deferred.resolve(data);
		}
	});

	return deferred.promise;
}

function checkSessionByManageArticle(req, res, next){
	supportSchema.find({
		"name":"technical_support_article"
	}).exec(function(err,result){
		if(err){
			console.log(err);
			next(err);
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
				article:result
			};
			next('',data);
		}
	});
}

function checkSessionByNews(req, res, next){
	var deferred = q.defer();
	var id = req.query.id;
	newsSchema.findOne({
		"_id":id
	},function(err,docs){
		if(err){
			next(err);
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
			news:docs
		};
		next('',data);
	});
}

function checkSessionByModifyProductList(req, res, next){
	var id = req.query.id;
	var listId = req.query.listId;
	productCenterSchema.findOne({
		"_id":id
	},function(err,docs){
		if(err){
			next(err);
		}else{
			var obj = {
				"_id":docs._id,
				"productClass":docs.productClass,
				data:{}
			}
			console.log(listId);
			console.log('====================');
			docs.list.forEach(function(vv,ii){
				console.log(vv._id);
				if(vv._id == listId){
					obj.data = {
						"_id" : vv._id, 
			            "createTime" : vv._crateTime, 
			            "content" : vv.content, 
			            "url" : vv.url, 
			            "fileType" : vv.fileType, 
			            "fileName" : vv.fileName, 
			            "title" : vv.title,
			            "titleEn":vv.titleEn,
			            "enContent":vv.enContent
					}
				}
			});
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
				product:obj
			};
			next('',data);
		}
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
	checkSessionByProductCenter:checkSessionByProductCenter,
	checkSessionByAddProductClass:checkSessionByAddProductClass,
	checkSessionByDownload:checkSessionByDownload,
	checkSessionByAddDownloadClass:checkSessionByAddDownloadClass,
	checkSessionBySupport:checkSessionBySupport,
	renderNewsDetail:renderNewsDetail,
	checkSessionByManage:checkSessionByManage,
	checkSessionByHandleBook:checkSessionByHandleBook,
	checkSessionByManageArticle:checkSessionByManageArticle,
	checkSessionByNews:checkSessionByNews,
	checkSessionByModifyProductList:checkSessionByModifyProductList
}