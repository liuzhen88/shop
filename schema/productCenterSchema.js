var mongoose = require('mongoose');

var productCenterSchema = new mongoose.Schema({
	productClass:String,
	list:[
		{
			title:String,
			fileName:String,
			fileType:String,
			url:String,
			content:String,
			createTime:String
		}
	]
});

var productCenterModel = mongoose.model('productcenters',productCenterSchema);

module.exports = productCenterModel;