var q = require('q');
var productCenterSchema = require('../schema/productCenterSchema');
var config = require("../config/config");
var fs = require("fs");

function saveProductData(req, res){
	var deferred = q.defer();
	var productClass = req.body.productClass;
	var title = req.body.title;
	var titleEn = req.body.titleEn;
	var main = req.body.main;
	main = JSON.parse(main);
	var fileName = main.fileName;
	var fileType = main.fileType;
	var source = main.source;
	var content = req.body.zhContent;
	var enContent = req.body.enContent;

	var sendFile = req.body.sendFile;
	sendFile = JSON.parse(sendFile);
	var pdfData = sendFile[0];

	var base64Data = source.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');

	var lastFileName = new Date().getTime()+"."+fileType;
	var newFilePath = config.productPath + lastFileName;

	var pdfBase64Data = pdfData.source.replace(/^data:;base64,/, "");
	var pdfDataBuffer = new Buffer(pdfBase64Data,'base64');//pdf buffer
	var pdfLastFileName = new Date().getTime()+pdfData.fileName;
	var pdfNewFilePath = config.productPath + pdfLastFileName;


	fs.writeFile(pdfData.fileName,pdfDataBuffer,function(err){
		if(err){
			var cont = config.data.error;
	    	cont.message = err;
	      	deferred.reject(cont);
	      }else{
	      	fs.rename(pdfData.fileName,pdfNewFilePath,function(err){
	      		if(err){
		    		console.log("file rename is error:"+err);
		    		var cont = config.data.error;
			    	cont.message = err;
			      	deferred.reject(cont);
		    	}else{

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
							    				titleEn:titleEn,
									    		fileName:fileName,
									    		fileType:fileType,
									    		url:config.productUrl+"/"+lastFileName,
									    		content:content,
									    		enContent:enContent,
									    		createTime:new Date().getTime(),
									    		pdf:{
									    			fileName:pdfData.fileName,
									    			url:config.productUrl+"/"+pdfLastFileName
									    		}
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
					    				titleEn:titleEn,
							    		fileName:fileName,
							    		fileType:fileType,
							    		url:config.productUrl+"/"+lastFileName,
							    		content:content,
							    		enContent:enContent,
							    		createTime:new Date().getTime(),
							    		pdf:{
							    			fileName:pdfData.fileName,
							    			url:config.productUrl+"/"+pdfLastFileName
							    		}
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
		    	}
	      	});
	      }
	});


	return deferred.promise;
}

function saveNewProductClass(req, res){
	var deferred = q.defer();
	var productClass = req.body.productClass;
	var productClassEn = req.body.productClassEn;
	var insertData = new productCenterSchema({
		productClass:productClass,
		productClassEn:productClassEn,
		list:[]
	});
	insertData.save(function(err){
		if(err){
			console.log(err);
			deferred.reject(err);
		}
		var context = config.data.success;
		deferred.resolve(context);
	});

	return deferred.promise;
}

function getProductClassDataById(req, res){
	var deferred = q.defer();
	var id = req.query.id;
	productCenterSchema.findOne({
		"_id":id
	},function(err,docs){
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

function deletePrecentCenterDocument(req, res){
	var deferred = q.defer();
	var id = req.query.id;
	var listId = req.query.listId;
	productCenterSchema.findOne({
		"_id":id
	},function(err,docs){
		if(err){
			deferred.reject(err);
		}else{
			if(docs.list.length == 1){
				//删除整个
				productCenterSchema.remove({
					"_id":id
				},function(err){
					if(err){
						deferred.reject(err);
					}else{
						var cont = config.data.success;
						deferred.resolve(cont);
					}
				});
			}else{
				//删除list里面选中的
				var list = docs.list;
				var indexs = '';
				list.forEach(function(value,index){
					if(value._id == listId){
						indexs = index;
					}
				});
				list.splice(indexs,1);
				productCenterSchema.update({
					'_id':id
				},{
					$set:{
						list:list
					}
				},function(err){
					if(err){
						deferred.reject(err);
					}else{
						var cont = config.data.success;
						deferred.resolve(cont);
					}
				});
			}
		}
	});

	return deferred.promise;
}

function updateProductCenterData(req, res){
	var deferred = q.defer();
	var title = req.body.title;
	var titleEn = req.body.titleEn;
	var content = req.body.content;
	var enContent = req.body.enContent;
	var status = req.body.status;
	var id = req.body.id;
	var listId = req.body.listId;
	if(status == 0){
		//图片不更新
		productCenterSchema.update({
			"_id":id,
			"list._id":listId
		},{
			$set:{
				'list.$.title':title,
				'list.$.titleEn':titleEn,
				'list.$.content':content,
				'list.$.enContent':enContent
			}
		},function(err){
			if(err){
				console.log(err);
				deferred.reject(err);
			}else{
				var cont = config.data.success;
				deferred.resolve(cont);
			}
		});
	}else{
		//图片重新写入
		var source = req.body.source;
		var fileName = req.body.fileName;
		var fileType = req.body.fileType;

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
		    	//new image path = config.productUrl+"/"+lastFileName
		    	productCenterSchema.update({
		    		'_id':id,
		    		'list._id':listId
		    	},{
		    		$set:{
		    			'list.$.title':title,
		    			'list.$.titleEn':titleEn,
		    			'list.$.content':content,
		    			'list.$.enContent':enContent,
		    			'list.$.url':config.productUrl+"/"+lastFileName,
		    			'list.$.fileType':fileType,
		    			'list.$.fileName':fileName
		    		}
		    	},function(err){
		    		if(err){
		    			deferred.reject(err);
		    		}else{
		    			var t = config.data.success;
		    			deferred.resolve(t);
		    		}
		    	});
		    });
		});
	}

	return deferred.promise;
}

module.exports = {
	saveProductData:saveProductData,
	saveNewProductClass:saveNewProductClass,
	getProductClassDataById:getProductClassDataById,
	deletePrecentCenterDocument:deletePrecentCenterDocument,
	updateProductCenterData:updateProductCenterData
}