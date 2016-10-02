var mongoose = require('mongoose');

var productCenterSchema = new mongoose.Schema({
	productClass:String,
	title:String,
	fileName:String,
	fileType:String,
	url:String,
	content:String,
	createTime:String
});

var productCenterModel = mongoose.model('productCenter',productCenterSchema);

module.exports = productCenterModel;