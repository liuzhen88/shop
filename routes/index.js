var express = require('express');
var router = express.Router();
var pageRender = require('../service/pageRender');

router.get('/',function(req, res, next){
	pageRender.renderIndex(req,res).then(function(data){
		res.render('./index',{data:data});
	}).fail(function(err){
		res.render('./index',{});
	});	
});

router.get('/index',function(req, res, next){
	pageRender.renderIndex(req,res).then(function(data){
		res.render('./index',{data:data});
	}).fail(function(err){
		res.render('./index',{});
	});	
});

router.get('/productCenter',function(req, res, next){
	pageRender.renderProductCenter(req,res).then(function(data){
		res.render('./productCenter',{data:data});
	}).fail(function(err){
		res.render('./productCenter',{});
	});	
});

router.get('/download',function(req, res, next){
	pageRender.renderDownload(req,res).then(function(data){
		res.render('./download',{data:data});
	}).fail(function(err){
		res.render('./download',{});
	});	
});

router.get('/support',function(req, res, next){
	pageRender.renderSupport(req,res).then(function(data){
		res.render('./support',{data:data});
	}).fail(function(err){
		res.render('./support',{});
	});	
});

router.get('/contact',function(req, res, next){
	pageRender.renderContact(req,res).then(function(data){
		res.render('./contact',{data:data});
	}).fail(function(err){
		res.render('./contact',{});
	});	
});

router.get('/about',function(req, res, next){
	pageRender.renderAbout(req,res).then(function(data){
		res.render('./about',{data:data});
	}).fail(function(err){
		res.render('./about',{});
	});	
});

router.get("/login",function(req,res,next){
	res.render("./admin/login",{});
});

router.get("/admin",function(req,res,next){
	pageRender.checkSession(req, res, function(data){
		data.this_position="首页广告图";
		res.render('./admin/index', {data:data});
	});
});

router.get("/admin/index",function(req,res,next){
	pageRender.checkSession(req, res, function(data){
		data.this_position="首页广告图";
		res.render('./admin/index', {data:data});
	});
});

router.get("/admin/about",function(req,res,next){
	pageRender.checkSessionByAbout(req, res, function(data){
		data.this_position="关于我们";
		res.render('./admin/about', {data:data});
	});
});

router.get("/admin/productCenter",function(req,res,next){
	pageRender.checkSessionByProductCenter(req, res, function(data){
		data.this_position="产品中心";
		res.render('./admin/productCenter', {data:data});
	});
});

router.get("/modifyPassword",function(req,res,next){
	pageRender.checkSession(req,res,function(data){
		data.this_position = "修改密码";
		res.render('./admin/modifyPassword',{data});
	});
});

module.exports = router;
