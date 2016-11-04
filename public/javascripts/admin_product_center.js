$(function(){
	var sendFile = [];
	var productMainImage = {};
	$(".list").removeClass('has-select');
	$(".list").eq(1).addClass('has-select');
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
			var source = this.result;
			var subImage = "<img src="+source+" data-fileName="+fileName+" data-fileType="+fileType+" class='product-main-image' width='200px' height='132px' /><div class='del-product-main-image'>删除</div>"
			$("#main-content").append(subImage);
			$(".del-product-main-image").click(function(){
				var index = $(".del-product-main-image").index(this);
				$('.product-main-image').eq(index).remove();
				$(this).remove();
			})
		}
	}
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
	$("#save-product").click(function(){
		if(sendFile.length == 0){
			alert('请上传pdf压缩文件');
			return;
		}
		if(sendFile.length>1){
			alert('上传pdf压缩文件个数只能为1');
			return;
		}
		var productClass = $("#product-class").val();
		var title = $("#product-title").val();
		var titleEn = $("#product-title-en").val();
		var main = {
			fileName:$('.product-main-image').attr('data-fileName'),
			fileType:$(".product-main-image").attr('data-fileType'),
			source:$('.product-main-image').attr('src')
		};
		//var content = $('.ql-editor').html();
		var f = confirm('确定要保存吗?');
		if(f){
			var zhContent = $(".ql-editor").eq(0).html();
			var enContent = $(".ql-editor").eq(1).html();
			saveProductData(productClass,title,titleEn,main,zhContent,enContent,sendFile);
		}
	});

	function saveProductData(productClass, title, titleEn, main, zhContent, enContent, sendFile){
		$.ajax({
			url:serverUrl+"/users/saveProductData",
			type:'post',
			dataType:'json',
			data:{
				productClass:productClass,
				title:title,
				titleEn:titleEn,
				main:JSON.stringify(main),
				zhContent:zhContent,
				enContent:enContent,
				sendFile:JSON.stringify(sendFile)
			},
			success:function(data){
				if(data.code == '200'){
					alert(data.message);
					window.location.reload();
				}
			},
			error:function(err){
				console.log(err);
			}
		})
	}

	$('.del-about-news').click(function(){
		var f = confirm('确定要删除吗?');
		if(f){
			var id = $(this).attr('data-top-id');
			var listId = $(this).attr('data-list-id');
			$.ajax({
				url:serverUrl+"/users/deletePrecentCenterDocument?id="+id+"&listId="+listId,
				type:'get',
				dataType:'json',
				success:function(data){
					alert(data.message);
					window.location.reload();
				},
				error:function(err){
					alert(err);
				}
			});
		}
	});

	$('.modify-about-news').click(function(){
		var id = $(this).attr('data-top-id');
		var listId = $(this).attr('data-list-id');
		window.location.href='/admin/modifyProductList?id='+id+'&listId='+listId;
	});

	var uploads = document.getElementById("pdf");
	uploads.onchange = function(e){
		var file = e.target.files[0];
		var fileSize = file.size;
		var fileName = file.name;
		var typelz = file.type;
		if(typelz && (typelz.indexOf('zip')<0 && typelz.indexOf('rar')<0)){
			alert("请上传压缩文件");
		}else{
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e){
				var source = this.result;
				var obj = {
					fileSize:fileSize,
					fileName:fileName,
					source:source
				};
				sendFile.push(obj);
				var sub = "<span class='zip'>"
						+	"<img src='/images/zip.png'>"
						+	"<div>"+fileName+"</div>"	
						+"</span>";
				$("#upload-container").append(sub);
			}
		}
	}
});