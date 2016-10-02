var q = require('q');
var productCenterSchema = require('../schema/productCenterSchema');
var config = require("../config/config");
var fs = require("fs");
var _ = require("underscore");

function saveProductData(req, res){
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
	    	var cont = config.data.error;
	    	cont.message = err;
	      	deferred.reject(cont);
	    }
	    fs.rename(fileName,newFilePath,function(err){
	    	if(err){
	    		console.log("file rename is error:"+err);
	    		var cont = config.data.error;
		    	cont.message = err;
		      	deferred.reject(cont);
	    	}
	    	//write success then save product center data 	

	    	productCenterSchema.findOne({
	    		"productClass":productClass
	    	},function(err,docs){
	    		if(err){
	    			console.log(err);
	    			deferred.reject(err);
	    		}
	    		if(!docs){
	    			//新建
	    			var productCenterData = new productCenterSchema({
			    		productClass:productClass,
			    		list:[
			    			{
			    				title:title,
					    		fileName:fileName,
					    		fileType:fileType,
					    		url:config.productUrl+"/"+lastFileName,
					    		content:content,
					    		createTime:new Date().getTime()
			    			}
			    		]
			    	});
			    	productCenterData.save(function(err){
			    		if(err){
			    			console.log(err);
			    			deferred.reject(err);
			    		}
			    		var context = config.data.success;
			    		deferred.resolve(context);
			    	});
	    		}else{
	    			//更新
	    			var id = docs._id;
	    			var list = docs.list;
	    			var lists = {
	    				title:title,
			    		fileName:fileName,
			    		fileType:fileType,
			    		url:config.productUrl+"/"+lastFileName,
			    		content:content,
			    		createTime:new Date().getTime()
	    			};
	    			list.push(lists);
	    			productCenterSchema.update({
	    				"_id":id
	    			},{
	    				$set:{
	    					list:list
	    				}
	    			},function(err){
	    				if(err){
	    					console.log(err);
	    					deferred.reject(err);
	    				}
	    				var context = config.data.success;
			    		deferred.resolve(context);
	    			}); 
	    		}
	    	});	
	    });
	});

	return deferred.promise;
}

module.exports = {
	saveProductData:saveProductData
}