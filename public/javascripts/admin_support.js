$(function(){
	$('.list').removeClass('has-select');
	$('.list').eq(3).addClass('has-select');
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
});