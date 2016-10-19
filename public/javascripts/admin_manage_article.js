$(function(){
	$(".list").removeClass('has-select');
	$(".list").eq(3).addClass('has-select');
	$(".explain-document-action").click(function(){
		var f = confirm('确定要删除吗?');
		if(f){
			var id = $(this).attr('data-id');
			$.ajax({
				url:serverUrl+"/users/deleteArticle?id="+id,
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
});