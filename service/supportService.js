var q = require('q');
var supportSchema = require('../schema/supportSchema');
var fs = require('fs');
var config = require("../config/config");

function saveSupportArticle(req, res){
	var deferred = q.defer();
	var sendFile = req.body.sendFile;
	var promiseArr = [];
	sendFile = JSON.parse(sendFile);
	sendFile.forEach(function(value,index){
		var fileName = value.fileName;
		var fileSize = value.fileSize;
		var source = value.source;
		var base64Data = source.replace(/^data:\/\w+;base64,/, "");	
		var dataBuffer = new Buffer(base64Data, 'base64');
		promiseArr.push(writeFiles(fileName,dataBuffer,fileSize));
	});

	q.fcall(function(){
		return promiseArr
	}).spread(function(){
		var insertData = [];
		for(var key in arguments){
			var thisObj = arguments[key];
			insertData.push(thisObj);
		}
		saveSupportPromise(insertData).then(function(result){
			deferred.resolve(result);
		}).fail(function(err){
			deferred.reject(err);
		});
	});

	return deferred.promise;
}

function writeFiles(fileName, dataBuffer, fileSize){
	var deferred = q.defer();
	var newPath = config.downloadPath + fileName;
	fs.writeFile(fileName,dataBuffer,function(err){
		if(err){
			console.log(err);
			deferred.reject(err);
		}else{
			fs.rename(fileName,newPath,function(err){
				if(err){
					console.log(err);
					deferred.reject(err);
				}else{
					var obj = {
						name:'technical_support_article',
						fileName:fileName,
						fileSize:fileSize,
						filePath : config.downloadPathUrl + "/" + fileName,
						time : new Date().getTime()
					};
					deferred.resolve(obj);
				}
			});
		}
	});

	return deferred.promise;
}

function saveSupportPromise(data){
	var deferred = q.defer();
	supportSchema.insertMany(data,function(err){
		if(err){
			console.log(err);
			deferred.reject(err);
		}else{
			var context = config.data.success;
			deferred.resolve(context);
		}
	});

	return deferred.promise;
}

module.exports = {
	saveSupportArticle:saveSupportArticle
}