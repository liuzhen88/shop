var q = require('q');
var newsSchema = require('../schema/newsSchema');
var config = require('../config/config');

var limitNum = 14;

function saveNews(req, res){
	var deferred = q.defer();
	var title = req.body.title;
	var titleEn = req.body.titleEn;
	var content = req.body.content;
	var enContent = req.body.enContent;
	var newsSchemaModel = new newsSchema({
		title:title,
		titleEn:titleEn,
		content:content,
		enContent:enContent,
		timeStr:new Date().getTime(),
		time:get_time(new Date().getTime())
	});

	newsSchemaModel.save(function(err){
		if(err){
			console.log(err);
			deferred.reject(err);
			return;
		}
		var context = config.data.success;
		deferred.resolve(context);
	});

	return deferred.promise;
}

function get_time(this_time){
	Date.prototype.format = function(format) {
	    var date = {
	           "M+": this.getMonth() + 1,
	           "d+": this.getDate(),
	           "h+": this.getHours(),
	           "m+": this.getMinutes(),
	           "s+": this.getSeconds(),
	           "q+": Math.floor((this.getMonth() + 3) / 3),
	           "S+": this.getMilliseconds()
	    };
	    if (/(y+)/i.test(format)) {
	           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	    }
	    for (var k in date) {
	           if (new RegExp("(" + k + ")").test(format)) {
	                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
	                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
	           }
	    }
	    return format;
	}
	var cc=new Date(parseInt(this_time));
	var aa=cc.format('yyyy-MM-dd');
	return aa;
}

function getPageData(req, res){
	var deferred = q.defer();
	var page = req.query.page;
	page = Number(page) - 1;
	var skips = page * limitNum;
	newsSchema.find({}).sort({
		"timeStr":-1
	}).skip(skips).limit(limitNum).exec(function(err,docs){
		if(err){
			console.log(err);
			deferred.reject(err);
		}else{
			var context = config.data.success;
			context.data = docs;
			deferred.resolve(context);
		}
	});

	return deferred.promise;
}

function deleteAboutNewsById(req, res){
	var id = req.query.id;
	var deferred = q.defer();
	newsSchema.remove({
		"_id":id
	},function(err){
		if(err){
			deferred.reject(err);
		}else{
			var context = config.data.success;
			deferred.resolve(context);
		}
	});

	return deferred.promise;
}

function upateNewsContentById(req, res){
	var deferred = q.defer();
	var id = req.body.id;
	var title = req.body.title;
	var titleEn = req.body.titleEn;
	var content = req.body.content;
	var enContent = req.body.enContent;

	newsSchema.update({
		"_id":id
	},{
		$set:{
			title:title,
			titleEn:titleEn,
			content:content,
			enContent:enContent
		}
	},function(err){
		if(err){
			deferred.reject(err);
		}else{
			var c = config.data.success;
			deferred.resolve(c);
		}
	});

	return deferred.promise;
}

module.exports = {
	saveNews:saveNews,
	getPageData:getPageData,
	deleteAboutNewsById:deleteAboutNewsById,
	upateNewsContentById:upateNewsContentById
}