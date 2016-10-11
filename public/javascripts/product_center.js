$(document).ready(function(e) {
	$(".navs li").click(function(){
		$(this).addClass("lisa").siblings("li").removeClass("lisa")
		var id = $(this).attr('data-id');
		getProductClassDataById(id,function(result){
			var lists = result.data.list;
			for(var i=0;i<lists.length;i++){
				if(i == 0){
					var subdiv = "<li class='checked product-class-list' data-id="+lists[i]._id+">"
								+	"<img src="+lists[i].url+">"
								+	"<p>"+lists[i].title+"</p>"
								+	"<img class='checkedimg' src='images/checked.png'/>"
								+"</li>";
					$("#productClassList").append(subdiv);
				}else{
					var subdiv = "<li class='product-class-list' data-id="+lists[i]._id+">"
								+	"<img src="+lists[i].url+">"
								+	"<p>"+lists[i].title+"</p>"
								+"</li>";
					$("#productClassList").append(subdiv);
				}
			}

			$(".product-class-list").click(function(){
				$(".checkedimg").remove();
				$(".product-class-list").removeClass('checked');
				$(this).addClass('checked');
				var txt = "<img class='checkedimg' src='images/checked.png'/>";
				$(this).append(txt);
				var thisId = $(this).attr('data-id');
				var thatData = getListData(thisId,lists);
				$("#checkedClassImage").attr('src',thatData.url);
				$("#checkedClassTitle").html(thatData.title);
				$("#checkedClassContent").html(thatData.content);
				$("#selectedTitle").html(thatData.title);
			});

			if(lists.length>0){
				modifyProductListData(lists,0);
			}
		});
	});
	

	function modifyProductListData(lists, index){
		$("#selectedTitle").html(lists[index].title);
		$("#checkedClassImage").attr('src',lists[index].url);
		$("#checkedClassTitle").html(lists[index].title);
		$("#checkedClassContent").html(lists[index].content);
	}

	function getProductClassDataById(id, cb){
		$("#productClassList").empty();
		$("#selectedTitle").empty();
		$("#checkedClassImage").attr('src',"");
		$("#checkedClassTitle").empty();
		$("#checkedClassContent").empty();
		$.ajax({
			url:serverUrl+'/users/getProductClassDataById?id='+id,
			type:'get',
			dataType:'json',
			success:function(data){
				if(data.code == '200'){
					cb(data);
				}
			},
			error:function(err){
				console.log(err);
			}
		});
	}
	
	function getListData(id, lists){
		var thisData = {};
		for(var k=0;k<lists.length;k++){
			if(lists[k]._id == id){
				thisData = lists[k];
			}
		}
		return thisData;
	}
		
	$(".product-class-list").click(function(){
		$(".checkedimg").remove();
		$(".product-class-list").removeClass('checked');
		$(this).addClass('checked');
		var txt = "<img class='checkedimg' src='images/checked.png'/>";
		$(this).append(txt);
		var thatData = $(this).attr('data-result');
		thatData = JSON.parse(thatData);
		$("#checkedClassImage").attr('src',thatData.url);
		$("#checkedClassTitle").html(thatData.title);
		$("#checkedClassContent").html(thatData.content);
		$("#selectedTitle").html(thatData.title);
	});
});