$(function(){
	$(".list").removeClass('has-select');
	$(".list").eq(2).addClass('has-select');
	$(".explain-document-action").click(function(){
		var f = confirm('确定要删除吗?');
		if(f){
			var documentId = $(this).attr('data-top-id');
			var id = $(this).attr('data-id');
			$.ajax({
				url:serverUrl+"/users/deleteExplainDocument?documentId="+documentId+"&id="+id,
				type:'get',
				dataType:'json',
				success:function(data){
					if(data.code == '200'){
						alert(data.message);
						window.location.reload();
					}else{
						alert(data.message);
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	});

	$("#delete-all").click(function(){
		var thisId = $(this).attr('data-id');
		var ff = confirm('确定要删除整个分类吗?');
		if(ff){
			$.ajax({
				url:serverUrl+'/users/deleteAllExplainDocument?id='+thisId,
				type:'get',
				dataType:'json',
				success:function(data){
					if(data.code == '200'){
						alert('删除成功');
						window.location.href = '/admin/download';
					}else{
						alert(data.message);
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	});
});