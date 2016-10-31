$(function(){
	$('.list').removeClass('has-select');
	$('#saveProductName').click(function(){
		var productClass = $('#addNewProductClass').val();
		var productClassEn = $("#addNewProductClassEn").val();
		if(!productClass){
			alert("请输入产品分类名");
			return;
		}
		if(!productClassEn){
			alert('请输入英文名');
			return;
		}
		$.ajax({
			url:'../users/saveNewProductClass',
			type:'post',
			data:{
				productClass:productClass,
				productClassEn:productClassEn
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