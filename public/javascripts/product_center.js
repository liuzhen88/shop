$(document).ready(function(e) {
	$(".navs li").click(function(){
		$(this).addClass("lisa").siblings("li").removeClass("lisa")
		var s = $(this).index();
		$(".setproduct ul li").show();
		for(var i=0;i<s;i++){
			$(".setproduct ul li").eq(i).hide();
			
			}
		 
		});
	
	
		
	var txt = "<img class='checkedimg' src='images/checked.png'/>";
	$(".setproduct ul .checked").append(txt);
	$(".setproduct ul li").click(function(){
		$(".setproduct ul li .checkedimg").remove();
		$(this).addClass("checked").siblings("li").removeClass("checked");
		$(".setproduct ul .checked").append(txt);
		var test = $(this).find("p").text();
		var imgurl = $(this).find("img:first-child").attr("src");
		$(".leftproduct img").attr("src",imgurl);
		$(".leftproduct p,.producttitle p").text(test);
		})	
		
})