var main=(function(){
	var 
	map,
	domMap,
	setDomMap,
	initModule;
	setDomMap=function(){
		domMap={
			$btnRefresh:document.getElementById('butRefresh'),
			$btnAdd:document.getElementById('butAdd'),
			$container:document.getElementById('container'),
			$spinner: document.querySelector('.loader'),
			$input:document.getElementById('input')
		}
	}
	initModule=function(){
	
		
		var lnglat='',
		circles=[],
			circle=0,
			inputGroupCount=0;
		setDomMap();
		domMap.$btnRefresh.addEventListener('click',function(){
			domMap.$input.innerHTML='';
			inputGroupCount=0;
			for(var i=0;i<circles.length;i++){
				circles[i].show();
			}
		});
		domMap.$btnAdd.addEventListener('click',function(){
			// let html=domMap.$input.innerHTML;
			++inputGroupCount;
			domMap.$input.innerHTML='';
			domMap.$input.innerHTML='<br/>点：<input type="text" value="'+lnglat+'" name="" class="js-dot" data-index="'+inputGroupCount+'"/> 距离（km）：<input type="text" name="" class="js-circle" data-index="'+inputGroupCount+'"/>';
		});
		if(!AMap){return;}

		document.addEventListener('change',function(e){
			if(e.target.className=='js-circle'){
				var index=e.target.getAttribute('data-index'),
					dot=document.querySelector('[data-index="'+index+'"]');
					 var circle = new AMap.Circle({
				        center:new AMap.LngLat(dot.value.split(',')[0],dot.value.split(',')[1]),// 圆心位置
				        radius: parseFloat(e.target.value)*1000, //半径 米
				        strokeColor: "#F33", //线颜色
				        strokeOpacity: 1, //线透明度
				        strokeWeight: 0.1, //线粗细度
				        fillColor: "#ee2200", //填充颜色
				        fillOpacity: 0.35//填充透明度
				    });
				    circle.setMap(map);
				    circles.push(circle);
				    for(var i=0;i<circles.length;i++){
						circles[i].hide();
					}
			}
		},true)
		map = new AMap.Map('container',{
            resizeEnable: true,
            center:[121.514191,31.204758],
            zoom: 20
        });
        map.plugin('AMap.Geolocation', function () {
		   var geolocation = new AMap.Geolocation({
		        enableHighAccuracy: true,//是否使用高精度定位，默认:true
		        timeout: 120000,          //超过10秒后停止定位，默认：无穷大
		        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
		        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
		        showButton: true,        //显示定位按钮，默认：true
		        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
		        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
		        showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
		        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
		        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		    });
		    map.addControl(geolocation);
		    AMap.event.addListener(geolocation, 'complete', function(data){
		    	console.log('aaaaaaaa');
		    	console.log('aaaaaaaaaaaaaaaaaaaaa',data);
		    });//返回定位信息
		    AMap.event.addListener(geolocation, 'error', function(data){
		    	console.log('bbbbbbbbbbbbb',data);
		    });      //返回定位出错信息
		});
		AMap.event.addListener(map, "click", function(e) {
			new AMap.Marker({
				position: e.lnglat,
				map: map
			});
			lnglat=e.lnglat.toString();
		});

        domMap.$spinner.setAttribute('hidden', true);
        domMap.$container.removeAttribute('hidden');

		let url="aaa";
		 if ('caches' in window) {
		 	caches.match(url).then(function(response) {
		 		response&&response.json().then(function updateFromCache(json) {

		 		});
		 	});
		 }
	}
	return {
		initModule:initModule
	}
})();
main.initModule();