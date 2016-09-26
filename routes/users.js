var express = require('express');
var router = express.Router();
var serviceForCheck = require("../service/checkLogin");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/checkLogin",function(req, res){
	serviceForCheck.checkUserLogin(req,res).then(function(data){
		res.send(data);
	}).fail(function(err){
		res.send(err);
	});
});

module.exports = router;
