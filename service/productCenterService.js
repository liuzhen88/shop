var q = require('q');
var productCenterSchema = require('../schema/productCenterSchema');
var config = require("../config/config");
var fs = require("fs");
var _ = require("underscore");

function productCenterService(req, res){
	var deferred = q.defer();
	var productClass = req.body.productClass;
	var title = req.body.title;
	var main = req.body.main;
	main = JSON.parse(main);
	var fileName = main.fileName;
	var fileType = main.fileType;
	var source = main.source;
	var content = req.body.content;

	var base64Data = source.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');

	var lastFileName = new Date().getTime()+"."+fileType;
	var newFilePath = config.productPath + lastFileName;

	fs.writeFile(fileName,dataBuffer,function(err){
		if(err){
	    	var content = config.data.error;
	    	content.message = err;
	      	deferred.reject(content);
	    }
	    fs.rename(name,newFilePath,function(err){
	    	if(err){
	    		console.log("file rename is error:"+err);
	    		var content = config.data.error;
		    	content.message = err;
		      	deferred.reject(content);
	    	}
	    	//write success then save product center data 	
	    	var productCenterData = new productCenterSchema({
	    		productClass:productClass,
	    		title:title,
	    		fileName:fileName,
	    		fileType:fileType,
	    		url:productUrl+"/"+lastFileName,
	    		content:content,
	    		createTime:new Date().getTime()
	    	});

	    	productCenterData.save(function(err){
	    		if(err){
	    			console.log(err);
	    			deferred.reject(err);
	    		}
	    		var context = config.data.success;
	    		deferred.resolve(context);
	    	});
	    });
	});

	return deferred.promise;
}

module.exports = {
	productCenterService:productCenterService
}