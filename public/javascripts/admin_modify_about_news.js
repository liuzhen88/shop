$(function(){
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

	$('.save-news#save-news').click(function(){
		var id = $(this).attr('data-id');
		var title = $("#news-title").val();
		var content = $(".ql-editor").html();
		if(!title){
			alert('新闻标题不能为空');
			return;
		}
		if(!content){
			alert('新闻内容不能为空');
			return;
		}
		$.ajax({
			url:serverUrl+"/users/upateNewsContentById",
			type:'post',
			dataType:'json',
			data:{
				title:title,
				content:content,
				id:id
			},
			success:function(data){
				alert(data.message);
				window.location.href='/admin/about';
			},
			error:function(err){
				alert(err);
			}
		});
	});
});