var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
	title:String,
	content:String,
	timeStr:String,
	time:String
});

var newsSchemaModel = mongoose.model('news',newsSchema);

module.exports = newsSchemaModel;