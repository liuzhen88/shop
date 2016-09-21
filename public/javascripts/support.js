$(document).ready(function(e) {
    $(".diy-main dl dd").slideUp().eq(0).slideDown();
	$(".diy-main dl dt").click(function(){
		$(".diy-main dl dt").removeClass("diy-down");
		$(".diy-main dl dd").slideUp();
		$(this).siblings("dd").slideToggle();
		$(this).toggleClass("diy-down");
		});
		
	$(".overwhach").css({top:-600});
	$(".name ul.namefor li").click(function(){
		$(".overwhach").animate({top:0},800);
		var url = $(this).find("img").attr("src");
		$(".overwhach img:last-child").attr("src",url);
		
		})
	
	$(".overwhach img:first-child").click(function(){
		$(".overwhach").animate({top:-600},800);
		})	
		
})