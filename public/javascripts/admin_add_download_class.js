$(function(){
	$('.list').removeClass('has-select');
	$('#saveDownloads').click(function(){
		var productClass = $('#addDownloadsClass').val();
		if(!productClass){
			alert("请输入产品分类名");
			return;
		}
		$.ajax({
			url:'../users/saveDownloadsClass',
			type:'post',
			data:{
				downloadClass:productClass
			},
			dataType:"json",
			success:function(data){
				if(data.code == '200'){
					alert(data.message);
					window.location.href='/admin/addDownloadClass';
				}
			},
			error:function(err){
				console.log(err);
			}
		});
	});
});