var gobal = {};
$(function(){
	$('.list').removeClass('has-select');
	$('.list').eq(3).addClass('has-select');
	gobal.sendDataImage = [];
	gobal.sendFileName = [];
	gobal.sendFileType = [];
	var doc_w = $(document).width();
	var doc_h = $(window).height();
	$(".loading").css({
		"width":doc_w,
		"height":doc_h
	});
	var sendFile = [];
	var upload = document.getElementById("support-uploads");
	upload.onchange = function(e){
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
				$("#support").append(sub);
			}
		}
	};
	$('#support-save').click(function(){
		if(sendFile.length == 0){
			alert("请上传文件");
			return;
		}
		var f = confirm("确定要上传吗?");
		if(f){
			$.ajax({
				url:serverUrl+"/users/saveSupportArticle",
				type:'post',
				dataType:'json',
				data:{
					sendFile:JSON.stringify(sendFile)
				},
				success:function(data){
					if(data.code == '200'){
						alert(data.message);
						window.location.reload();
					}else{
						alert(data.message);
					}
				},
				error:function(err){
					alert(err);
				}
			});
		}
	});

	var uploads = document.getElementById("upload");
	uploads.onchange = function(e){
		var file = e.target.files[0];
		var fileName = file.name;
		gobal.sendFileName.push(fileName);
		var fileType = file.type.split("/")[1];
		if(fileType=="jpeg"){
			fileType = "jpg";
		}
		gobal.sendFileType.push(fileType);
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e){
			var source = this.result;
			gobal.sendDataImage.push(source);
			// result.setAttribute("src",source);
			var imgTag = "<div class='previewListContainer'>"
						+	"<img src="+source+" class='previewList'/>"
						+	"<div class='delete' onclick='del(this)'>删除"
						+ 	"</div>"
						+"</div>";
						
			$(".preview-img-container").append(imgTag);
			isShowpreviewContainer();
			setImgAttr();
		}
	}
	$("#btn").click(function(){
		uploadSource(gobal.sendDataImage,gobal.sendFileName,gobal.sendFileType);
	});	

	function uploadSource(imgData,fileName,fileType){
		$(".loading").show();
		$.ajax({
			url:serverUrl+"/users/loadProductNamerule",
			type:"post",
			data:{
				imgData:JSON.stringify(imgData),
				fileType:JSON.stringify(fileType),
				fileName:JSON.stringify(fileName)
			},
			dataType:"json",
			json:"callback",
			success:function(data){
				$(".loading").hide();
				alert(data.message);
				window.location.href="/admin/support";
			},
			error:function(err){
				console.log(err);
			}
		});
	}
});
function del(obj){
	var sendDataImage = gobal.sendDataImage;
	var fileName = gobal.sendFileName;
	var fileType = gobal.sendFileType;
	var index = $(".delete").index(obj);
	$(".previewListContainer").eq(index).remove();
	sendDataImage.splice(index,1);
	fileName.splice(index,1);
	fileType.splice(index,1);
	isShowpreviewContainer();
}
function isShowpreviewContainer(){
	if($(".previewListContainer").length>0){
		$(".preview-title").show();
		$(".upload-file").show();
	}else{
		$(".preview-title").hide();
		$(".upload-file").hide();
	}
}

function setImgAttr(){
	$(".previewList").each(function(index,value){
		if($(this).width() > $(".container-right").width()){
			$(this).width($(".container-right").width());
		}
	});
}