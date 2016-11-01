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

	var quill = new Quill('#editor-containers', {
	    modules: {
	      formula: true,
	      syntax: true,
	      toolbar: '#toolbar-containers'
	    },
	    placeholder: 'Compose an epic...',
	    theme: 'snow'
	});

	$('.save-news#save-news').click(function(){
		var id = $(this).attr('data-id');
		var title = $("#news-title").val();
		var titleEn = $("#news-title-en").val();
		var content = $(".ql-editor").eq(0).html();	//中文
		var enContent = $(".ql-editor").eq(1).html();	//英文
		if(!title){
			alert('新闻标题不能为空');
			return;
		}
		if(!titleEn){
			alert('新闻英文标题不能为空');
			return;
		}
		if(!content){
			alert('新闻内容不能为空');
			return;
		}
		if(!enContent){
			alert('新闻英文内容不能为空');
			return;
		}
		$.ajax({
			url:serverUrl+"/users/upateNewsContentById",
			type:'post',
			dataType:'json',
			data:{
				title:title,
				titleEn:titleEn,
				content:content,
				enContent:enContent,
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