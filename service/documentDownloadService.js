var q = require('q');
var fs = require('fs');
var config = require('../config/config');
var documentDownloadSchema = require('../schema/documentDownloadSchema');
var documentsSchema = require('../schema/documentsSchema');

function saveDownloadDocument(req, res){
	var deferred = q.defer();
	var sendData = req.body.sendData;
	sendData = JSON.parse(sendData);
	var classType = sendData.classType;	//分类名
	var sendFile = sendData.sendFile;
	var promiseArray = [];
	sendFile.forEach(function(value,index){
		var fileName = value.fileName;
		var fileSize = value.fileSize;
		var source = value.source;
		var base64Data = source.replace(/^data:\/\w+;base64,/, "");	
		var dataBuffer = new Buffer(base64Data, 'base64');
		promiseArray.push(fsWritePromise(fileName,dataBuffer,fileSize,classType));	
	});

	q.fcall(function(){
		return promiseArray;
	}).spread(function(){
		var insertData = [];
		for(var key in arguments){
			var thisObj = arguments[key];
			insertData.push(thisObj);
		}
		insertManyPromise(insertData).then(function(result){
			deferred.resolve(result);
		}).fail(function(err){
			deferred.reject(err);
		});
	});

	return deferred.promise;
}

//save promise
function fsWritePromise(fileName, dataBuffer, fileSize, classType){
	var deferred = q.defer();
	var returnPromise = {};
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
					returnPromise.fileName = fileName;
					returnPromise.fileSize = fileSize;
					returnPromise.classType = classType;
					returnPromise.filePath = config.downloadPathUrl + "/" + fileName;
					returnPromise.time = new Date().getTime();
					deferred.resolve(returnPromise);
				}
			});
		}
	});

	return deferred.promise;
}

//insert many promise
function insertManyPromise(data){
	var deferred = q.defer();
	documentDownloadSchema.insertMany(data,function(err){
		if(err){
			console.log(err);
			deferred.reject(err);
		}
		var context = config.data.success;
		deferred.resolve(context);
	});

	return deferred.promise;
}

function insertManyPromises(data){
	var deferred = q.defer();
	documentsSchema.insertMany(data,function(err){
		if(err){
			console.log(err);
			deferred.reject(err);
		}
		var context = config.data.success;
		deferred.resolve(context);
	});

	return deferred.promise;
}


//save product document
function savehandlebook(req, res){
	var deferred = q.defer();
	var promiseArr = [];
	var documents = req.body.documents;
	documents = JSON.parse(documents);
	documents.forEach(function(value,index){
		var fileName = value.fileName;
		var fileSize = value.fileSize;
		var source = value.source;
		var base64Data = source.replace(/^data:\/\w+;base64,/, "");	
		var dataBuffer = new Buffer(base64Data, 'base64');
		promiseArr.push(productDocumentsPromise(fileName,dataBuffer,fileSize));
	});

	q.fcall(function(){
		return promiseArr;
	}).spread(function(){
		var insertData = [];
		for(var key in arguments){
			var thisObj = arguments[key];
			insertData.push(thisObj);
		}
		insertManyPromises(insertData).then(function(result){
			deferred.resolve(result);
		}).fail(function(err){
			deferred.reject(err);
		});
	});

	return deferred.promise;
}

//product save promise
function productDocumentsPromise(fileName, dataBuffer, fileSize){
	var deferred = q.defer();
	var returnPromise = {};
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
					returnPromise.fileName = fileName;
					returnPromise.fileSize = fileSize;
					returnPromise.filePath = config.downloadPathUrl + "/" + fileName;
					returnPromise.time = new Date().getTime();
					deferred.resolve(returnPromise);
				}
			});
		}
	});

	return deferred.promise;
}

module.exports = {
	saveDownloadDocument:saveDownloadDocument,
	savehandlebook:savehandlebook
}