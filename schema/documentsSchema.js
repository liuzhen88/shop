var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
	fileName:String,
	fileSize:String,
	filePath:String,
	time:String
});

var documentsModel = mongoose.model('productdocuments',documentSchema);

module.exports = documentsModel;