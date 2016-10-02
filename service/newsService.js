var q = require('q');
var newsSchema = require('../schema/newsSchema');
var config = require('../config/config');

function saveNews(req, res){
	var deferred = q.defer();
	var title = req.body.title;
	var content = req.body.content;
	var newsSchemaModel = new newsSchema({
		title:title,
		content:content,
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

module.exports = {
	saveNews:saveNews
}