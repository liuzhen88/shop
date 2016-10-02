$(function(){
	var app = {
		init:function(){
			$(".list").removeClass('has-select');
			$(".list").eq(4).addClass('has-select');
			var quill = new Quill('#editor-container', {
			    modules: {
			      formula: true,
			      syntax: true,
			      toolbar: '#toolbar-container'
			    },
			    placeholder: 'Compose an epic...',
			    theme: 'snow'
			});
			$('#save-news').click(function(){
				var content = $(".ql-editor").html();
				var title = $("#news-title").val();
				if(!content){
					alert("新闻内容不能为空");
					return;
				}
				if(!title){
					alert('新闻标题不能为空');
					return;
				}
				app.saveNews(title, content);
			});
		},
		saveNews:function(title, content){
			$.ajax({
				url:serverUrl+"/users/saveNews",
				type:'post',
				dataType:'json',
				data:{
					title:title,
					content:content
				},
				success:function(data){
					if(data.code == 200){
						alert(data.message);
						window.location.reload();
					}else{
						alert(data.message);
					}
				}
			})
		}
	}
	app.init();
});