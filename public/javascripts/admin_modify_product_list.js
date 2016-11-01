$(function(){
	$('.list').removeClass('has-select');
	var quill = new Quill('#editor-container', {
	    modules: {
	      formula: true,
	      syntax: true,
	      toolbar: '#toolbar-container'
	    },
	    placeholder: 'Compose an epic...',
	    theme: 'snow'
	});
	var quills = new Quill('#editor-containers', {
	    modules: {
	      formula: true,
	      syntax: true,
	      toolbar: '#toolbar-containers'
	    },
	    placeholder: 'Compose an epic...',
	    theme: 'snow'
	});
	var content = $("#editor-container").attr('data-content');
	var enContent = $("#editor-containers").attr('data-content');
	$(".ql-editor").eq(0).append(content);
	$(".ql-editor").eq(1).append(enContent);
	var upload = document.getElementById("main-input");
	upload.onchange = function(e){
		var file = e.target.files[0];
		var fileName = file.name;
		var fileType = file.type.split("/")[1];
		if(fileType=="jpeg"){
			fileType = "jpg";
		}
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e){
			$(".product-main-image").remove();
			$(".del-product-main-image").remove();
			var source = this.result;
			var subImage = "<img src="+source+" data-fileName="+fileName+" data-fileType="+fileType+" class='product-main-image' width='200px' height='132px' /><div class='del-product-main-image'>删除</div>"
			$("#main-content").append(subImage);
			$(".del-product-main-image").click(function(){
				var index = $(".del-product-main-image").index(this);
				$('.product-main-image').eq(index).remove();
				$(this).remove();
			});
		}
	}
	$(".del-product-main-image").click(function(){
		var index = $(".del-product-main-image").index(this);
		$('.product-main-image').eq(index).remove();
		$(this).remove();
	})
	$("#save-product").click(function(){
		var id = request('id');
		var listId = request('listId');
		var title = $("#product-title").val();
		var titleEn = $("#product-title-en").val();
		var content = $(".ql-editor").eq(0).html();
		var enContent = $(".ql-editor").eq(1).html();
		var status = $(".product-main-image").attr('data-filename');
		if(!status){
			//没有修改主图
			$.ajax({
				url:"../users/updateProductCenterData",
				type:'post',
				data:{
					title:title,
					titleEn:titleEn,
					content:content,
					enContent:enContent,
					status:0,
					id:id,
					listId:listId
				},
				success:function(data){
					alert(data.message);
					window.location.href='/admin/productCenter';
				},
				error:function(err){
					console.log(err);
				}
			});
		}else{
			//修改过,传入base64
			var source = $('.product-main-image').attr('src');
			var fileName = $(".product-main-image").attr('data-filename');
			var fileType = $(".product-main-image").attr('data-filetype');
			$.ajax({
				url:"../users/updateProductCenterData",
				type:'post',
				data:{
					title:title,
					titleEn:titleEn,
					content:content,
					enContent:enContent,
					status:1,
					id:id,
					listId:listId,
					source:source,
					fileName:fileName,
					fileType:fileType
				},
				success:function(data){
					alert(data.message);
					window.location.href='/admin/productCenter';
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	});
	function request(paras) {
	    var url = location.href;
	    url = decodeURI(url);
	    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	    var paraObj = {};
	    for (var i = 0; j = paraString[i]; i++) {
	        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	    }
	    var returnValue = paraObj[paras.toLowerCase()];
	    if (typeof(returnValue) == "undefined") {
	        return "";
	    } else {
	        return returnValue;
	    }
	}
});