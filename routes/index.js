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
		data.bg = '/images/product_bg.png';
		res.render('./productCenter',{data:data});
	}).fail(function(err){
		res.render('./productCenter',{});
	});	
});

router.get('/download',function(req, res, next){
	pageRender.renderDownload(req,res).then(function(data){
		data.bg = '/images/download_bg.png';
		res.render('./download',{data:data});
	}).fail(function(err){
		res.render('./download',{});
	});	
});

router.get('/support',function(req, res, next){
	pageRender.renderSupport(req,res).then(function(data){
		data.bg = '/images/support_bg.png';
		res.render('./support',{data:data});
	}).fail(function(err){
		res.render('./support',{});
	});	
});

router.get('/contact',function(req, res, next){
	pageRender.renderContact(req,res).then(function(data){
		data.bg = '/images/contact_bg.png';
		res.render('./contact',{data:data});
	}).fail(function(err){
		res.render('./contact',{});
	});	
});

router.get('/about',function(req, res, next){
	pageRender.renderAbout(req,res).then(function(data){
		data.bg = '/images/about_bg.png';
		res.render('./about',{data:data});
	}).fail(function(err){
		res.render('./about',{});
	});	
});

router.get('/newsDetail',function(req,res){
	pageRender.renderNewsDetail(req,res).then(function(data){
		data.bg = '/images/detail_bg.png';
		console.log(data);
		res.render('./newsDetail',{data:data});
	}).fail(function(err){
		res.render("./newsDetail",{});
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

router.get('/admin/addProductClass',function(req,res,next){
	pageRender.checkSessionByAddProductClass(req,res,function(data){
		data.this_position="新增产品中心分类";
		res.render('./admin/addProductClass', {data:data});
	});
});

router.get('/admin/addDownloadClass',function(req,res,next){
	pageRender.checkSessionByAddDownloadClass(req,res,function(data){
		data.this_position="新增文档下载分类";
		res.render('./admin/addDownloadClass', {data:data});
	});
});

router.get('/admin/download',function(req,res,next){
	pageRender.checkSessionByDownload(req,res,function(data){
		data.this_position = '文档下载';
		res.render('./admin/download',{data:data});
	});
});

router.get('/admin/support',function(req,res,next){
	pageRender.checkSessionBySupport(req,res,function(data){
		data.this_position = '技术支持';
		res.render('./admin/support',{data:data});
	});
});

router.get("/modifyPassword",function(req,res,next){
	pageRender.checkSession(req,res,function(data){
		data.this_position = "修改密码";
		res.render('./admin/modifyPassword',{data:data});
	});
});

router.get('/admin/manageExplainDocument',function(req,res){
	pageRender.checkSessionByManage(req,res,function(data){
		data.this_position = "文档下载-产品说明文档管理";
		res.render('./admin/manageExplainDocument',{data:data});
	});
});

router.get('/admin/manageHandleBook',function(req,res){
	pageRender.checkSessionByHandleBook(req,res,function(data){
		data.this_position = "文档下载-产品手册管理";
		res.render('./admin/manageHandleBook',{data:data});
	});
});

router.get('/admin/manageArticle',function(req,res){
	pageRender.checkSessionByManageArticle(req,res,function(err,data){
		data.this_position = "技术支持-技术文章管理";
		res.render('./admin/manageArticle',{data:data});
	});
});

module.exports = router;
