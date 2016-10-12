$(function(){
	var page = 1;
	var total = $("#news-container").attr('data-total');
	var app = {
		init:function(){
			if(total == 1){
				$("#prev").addClass("not-click");
				$("#next").addClass('not-click');
			}
			var that = this;
			$(".news").click(function(){
				var id = $(this).attr('data-id');
				window.location.href='/newsDetail?id='+id;
			});
			$('#prev').click(function(){
				//prev page
				if(page == 1){
					$('#prev').addClass('not-click');
					alert('亲,已经是第一页啦!');
				}else{
					page --;
					if(page == 1){
						$('#prev').addClass('not-click');
						$("#next").removeClass('not-click');
					}else{
						$("#prev").removeClass("not-click");
						$("#next").removeClass('not-click');
					}
					that.getPageData(page,function(result){
						that.templete(result.data);
					});
				}
			});

			$('#next').click(function(){
				//next page
				if(total == page){
					$("#next").addClass('not-click');
					if(total!=1){
						$("#prev").removeClass("not-click");
					}
					alert('亲,已经是最后一页啦!');
				}else{
					page ++;
					if(page == total){
						$("#next").addClass('not-click');
					}else{
						$("#next").removeClass('not-click');
					}
					$("#prev").removeClass("not-click");
					that.getPageData(page,function(result){
						that.templete(result.data);
					});
				}
			});
		},
		getPageData:function(thisPage, cb){
			$.ajax({
				url:serverUrl+'/users/getPageData?page='+thisPage,
				type:'get',
				dataType:'json',
				success:function(data){
					if(data.code == '200'){
						cb(data);
					}else{
						alert(data.message);
					}
				},
				error:function(err){
					console.log(err);
				}
			});
		},
		templete:function(data){
			$("#news-container").empty();
			for(var i=0;i<data.length;i++){
				if(i%2!=0){
					var subdiv = "<li class='news' data-id="+data[i]._id+">"
								+	"<a>"+data[i].title+"</a>"
								+	"<span class='news-time'>"+data[i].time+"</span>"
								+"</li>";
					$("#news-container").append(subdiv);
				}else{
					var subdiv = "<li class='news mf' data-id="+data[i]._id+">"
								+	"<a>"+data[i].title+"</a>"
								+	"<span class='news-time'>"+data[i].time+"</span>"
								+"</li>";
					$("#news-container").append(subdiv);
				}
			}
		}
	};

	app.init();
});