var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
	classType:String,
	name:String,
	data:[
		{
			fileName:String,
			fileSize:String,
			filePath:String,
			time:String
		}
	]
});

var documentModel = mongoose.model('explaindocuments',documentSchema);

module.exports = documentModel;