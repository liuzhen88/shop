var mongoose = require('mongoose');

var ruleSchema = new mongoose.Schema({
	name:String,
	fileName:String,
	fileSize:String,
	filePath:String,
	time:String
});

var ruleModel = mongoose.model('rules',ruleSchema);

module.exports = ruleModel;