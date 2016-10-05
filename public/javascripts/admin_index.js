$(function(){
	var app = {
		init:function(){
			var that = this;
			$(".list").eq(0).addClass('has-select');
			$(".list").click(function(){
				var index = $(".list").index(this);
				switch(index)
				{
					case 0:
						window.location.href="/admin/index";
						break;
					case 1:
						window.location.href="/admin/productCenter";
						break;
					case 2:
						window.location.href="/admin/download";
						break;
					case 3:
						window.location.href="/";
						break;
					case 4:
						window.location.href="/admin/about";
						break;
				}
			});
			$(".exit-login").click(function(){
				that.exitLogin();
			});
			$(".modfiy-password").click(function(){
				window.location.href="/modifyPassword";
			});
		},
		exitLogin:function(){
			$.ajax({
				url:serverUrl+"/users/exitLogin",
				type:"get",
				dataType:"json",
				json:"callback",
				success:function(data){
					if(data.code==200){
						alert("安全退出成功");
						window.location.href="/login";
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		}
	}

	app.init();
});