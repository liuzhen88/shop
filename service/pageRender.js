var q = require('q');
var config = require('../config/config');

function renderIndex(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.index.title;
	deferred.resolve(context);

	return deferred.promise;
}

function renderProductCenter(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.productCenter.title;
	deferred.resolve(context);

	return deferred.promise;
}

function renderDownload(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.download.title;
	deferred.resolve(context);

	return deferred.promise;
}

function renderSupport(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.support.title;
	deferred.resolve(context);

	return deferred.promise;
}

function renderContact(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.support.title;
	deferred.resolve(context);

	return deferred.promise;
}

function renderAbout(req, res){
	var deferred = q.defer();
	var context = {};
	context.title = config.support.title;
	deferred.resolve(context);

	return deferred.promise;
}

module.exports = {
	renderIndex:renderIndex,
	renderProductCenter:renderProductCenter,
	renderDownload:renderDownload,
	renderSupport:renderSupport,
	renderContact:renderContact,
	renderAbout:renderAbout
}