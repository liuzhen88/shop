$(function(){
	$('.list').removeClass('has-select');
	$('#saveProductName').click(function(){
		var productClass = $('#addNewProductClass').val();
		if(!productClass){
			alert("请输入产品分类名");
			return;
		}
		$.ajax({
			url:'../users/saveNewProductClass',
			type:'post',
			data:{
				productClass:productClass
			},
			dataType:"json",
			success:function(data){
				if(data.code == '200'){
					alert(data.message);
					window.location.href='/admin/productCenter';
				}
			},
			error:function(err){
				console.log(err);
			}
		});
	});
});