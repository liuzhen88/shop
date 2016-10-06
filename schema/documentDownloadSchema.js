var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
	fileName:String,
	classType:String,
	fileSize:String,
	filePath:String,
	time:String
});

var documentModel = mongoose.model('documentdownloads',documentSchema);

module.exports = documentModel;