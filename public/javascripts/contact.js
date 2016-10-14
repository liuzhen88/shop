$(function(){
	//基本地图加载
	var windowsArr = [];
    var marker = [];
    var map = new AMap.Map("mapContainer", {
        resizeEnable: true,
        center: [118.833187,31.956839],//地图中心点
        zoom: 13 //地图显示的缩放级别
    });
    //步行导航
	 AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
      var autoOptions = {
        city: "南京", //城市，默认全国
        input: "keyword"//使用联想输入的input的id
      };
      autocomplete= new AMap.Autocomplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
            city:'南京',
            map:map
      })
      AMap.event.addListener(autocomplete, "select", function(e){
         //TODO 针对选中的poi实现自己的功能
         placeSearch.search(e.poi.name);
      });
    });
	function show(obj){
	map.clearMap();
	var text = $(obj).parent("#tip").find(".input").val();
    AMap.service(["AMap.Driving"], function() {
        var driving = new AMap.Driving({
            map: map,
            panel: "panel"
        }); //构造路线导航类
        // 根据起终点坐标规划步行路线
        driving.search([
            {keyword: text},
            {keyword: '苏州站'}
        ]);
    });
	}
});