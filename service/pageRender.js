var q = require('q');
var config = require('../config/config');

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
	deferred.resolve(context);

	return deferred.promise;
}

function checkSession(req , res, next){
	if(!req.session.user){
		res.redirect("/login");
		return;
	}
	var data = {
		logoUrl:"/images/logo.png",
		this_position:"",
		list:[
			"首页广告图",
			"商品展示",
			"公告管理",
			"分类管理",
			"专题管理"
		]
	}
	next(data);
}

module.exports = {
	renderIndex:renderIndex,
	renderProductCenter:renderProductCenter,
	renderDownload:renderDownload,
	renderSupport:renderSupport,
	renderContact:renderContact,
	renderAbout:renderAbout,
	checkSession:checkSession
}