$(function(){
	var sendFile = [];
	var documents = [];
	$('.list').removeClass('has-select');
	$('.list').eq(2).addClass('has-select');
	var upload = document.getElementById("uploads");
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
				$("#upload-container").append(sub);
			}
		}
	};
	var up = document.getElementById('handlebook-uploads');
	up.onchange = function(e){
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
				documents.push(obj);
				var sub = "<span class='zip'>"
						+	"<img src='/images/pdf.jpg'>"
						+	"<div>"+fileName+"</div>"	
						+"</span>";
				$("#product-documents").append(sub);
			}
		}
	}
	$('#product-explain-save').click(function(){
		var sendData = {};
		var types = $("#download-type").val();
		if(!types){
			alert("产品文档说明分类不能为空");
			return;
		}
		sendData.classType = types;
		if(sendFile.length == 0){
			alert("请上传文件");
			return;
		}
		sendData.sendFile = sendFile;
		var f = confirm("确定要上传吗?");
		if(f){
			$.ajax({
				url:serverUrl+"/users/saveDownloadDocument",
				type:'post',
				dataType:'json',
				data:{
					sendData:JSON.stringify(sendData)
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
	$("#product-handlebook-save").click(function(){
		if(documents.length == 0){
			alert("请上传文件");
			return;
		}
		var f = confirm("确定要上传吗?");
		if(f){
			$.ajax({
				url:serverUrl+"/users/savehandlebook",
				type:'post',
				dataType:'json',
				data:{
					documents:JSON.stringify(documents)
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
});