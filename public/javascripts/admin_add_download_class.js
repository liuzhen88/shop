$(function(){
	$('.list').removeClass('has-select');
	$('#saveDownloads').click(function(){
		var productClass = $('#addDownloadsClass').val();
		var addDownloadsClassEn = $("#addDownloadsClassEn").val();
		if(!productClass){
			alert("请输入产品分类名");
			return;
		}
		if(!addDownloadsClassEn){
			alert('请输入新增分类英文名');
			return;
		}
		$.ajax({
			url:'../users/saveDownloadsClass',
			type:'post',
			data:{
				downloadClass:productClass,
				downloadClassEn:addDownloadsClassEn
			},
			dataType:"json",
			success:function(data){
				if(data.code == '200'){
					alert(data.message);
					window.location.href='/admin/download';
				}
			},
			error:function(err){
				console.log(err);
			}
		});
	});
});