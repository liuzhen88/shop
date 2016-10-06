var mongoose = require('mongoose');

var supportSchema = new mongoose.Schema({
	name:String,
	fileName:String,
	fileSize:String,
	filePath:String,
	time:String
});

var supportModel = mongoose.model('supports',supportSchema);

module.exports = supportModel;