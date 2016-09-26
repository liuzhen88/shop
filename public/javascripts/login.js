$(function(){
	$("#btn").click(function(){
		var username = $("#username").val();
		var password = $("#password").val();
		if(!username || !password){
			alert("用户名或密码不能为空");
		}else{
			$.ajax({
				url:serverUrl+"/users/checkLogin",
				type:"post",
				data:{
					username:username,
					password:password
				},
				dataType:"json",
				json:"callback",
				success:function(data){
					if(data.code=="200"){
						addcookie("session.id",data.session.id);
						window.location.href="/admin/index";	
					}else{
						alert(data.message);
					}
				},
				error:function(err){
					alert(err.message);
				}
			});
		}
	});
	document.onkeydown = keyevent;

	function keyevent(){
		if(event.keyCode == 13){
			$("#btn").click();
		}		
	}
	
});