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
			var quills = new Quill('#editor-containers', {
			    modules: {
			      formula: true,
			      syntax: true,
			      toolbar: '#toolbar-containers'
			    },
			    placeholder: 'Compose an epic...',
			    theme: 'snow'
			});
			$('#save-news').click(function(){
				var content = $(".ql-editor").eq(0).html();
				var enContent = $('.ql-editor').eq(1).html();
				var title = $("#news-title").val();
				var titleEn = $("#news-title-en").val();
				if(!content){
					alert("中文新闻内容不能为空");
					return;
				}
				if(!enContent){
					alert('英文新闻内容不能为空');
					return;
				}
				if(!title){
					alert('新闻标题不能为空');
					return;
				}
				if(!titleEn){
					alert('英文标题不能为空');
					return;
				}
				app.saveNews(title, content, titleEn, enContent);
			});

			$(".del-about-news").click(function(){
				var thisId = $(this).attr('data-id');
				var f = confirm('确定要删除吗?');
				if(f){
					app.removeNewsById(thisId);
				}
			});
		},
		saveNews:function(title, content, titleEn, enContent){
			$.ajax({
				url:serverUrl+"/users/saveNews",
				type:'post',
				dataType:'json',
				data:{
					title:title,
					titleEn:titleEn,
					content:content,
					enContent:enContent
				},
				success:function(data){
					if(data.code == 200){
						alert(data.message);
						window.location.reload();
					}else{
						alert(data.message);
					}
				}
			});
		},
		removeNewsById:function(id){
			$.ajax({
				url:serverUrl+"/users/deleteAboutNewsById?id="+id,
				type:'get',
				dataType:'json',
				success:function(data){
					if(data.code == 200){
						alert(data.message);
						window.location.reload();
					}else{
						alert(data.message);
					}
				}
			});
		}
	}
	app.init();
});