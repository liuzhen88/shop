var mongoose = require('mongoose');

var productCenterSchema = new mongoose.Schema({
	productClass:String,
	productClassEn:String,
	list:[
		{
			title:String,
			titleEn:String,
			fileName:String,
			fileType:String,
			url:String,
			content:String,
			enContent:String,
			createTime:String
		}
	]
});

var productCenterModel = mongoose.model('productcenters',productCenterSchema);

module.exports = productCenterModel;