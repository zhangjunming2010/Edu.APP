mui.init({
	swipeBack: false,
	
});

mui.plusReady(function() {

	var self = plus.webview.currentWebview();

	var statusbarH = 44;
	//由于采用了系统状态栏沉浸效果需要计算系统状态栏的高度
	if(plus.navigator.isImmersedStatusbar()) { // 兼容immersed状态栏模式
		// 获取状态栏高度并根据业务需求处理，这里重新计算了子窗口的偏移位置
		statusbarH = (Math.round(plus.navigator.getStatusbarHeight()));
	}

	//定位按钮
	var locationNv = util.drawNative('locationNv', {
		top: (statusbarH) + 'px',
		left: '0px',
		right: '0px',
		width: '100px',
		height: '44px',
		position: 'dock'
	}, [{
		tag: 'font',
		id: 'locationNv1',
		text: '\ue614',
		position: {
			top: '0px',
			left: '10px',
			width: '18px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#fff',
			size: '20px'
		}
	}, {
		tag: 'font',
		id: 'locationNv2',
		text: '星城汇 \ue7a2',
		position: {
			top: '0px',
			left: '30px',
			width: '80px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'left',
			color: '#fff',
			size: '16px',
		}
	}]);
	self.append(locationNv);
	
	//添加左右切换tab功能
	var tabIndex = 0;
	document.addEventListener("swipeleft", function() {
		if(tabIndex < mui('#tabs div').length - 1){
			mui('#tabs div').each(function(){
				this.className = 'mui-col-sm-3 mui-col-xs-3';
			});
			mui('#tabs div')[tabIndex + 1].className = 'mui-col-sm-3 mui-col-xs-3 active';
			tabIndex ++ ;
		}
	});
	document.addEventListener("swiperight", function() {
		if(tabIndex > 0){
			mui('#tabs div').each(function(){
				this.className = 'mui-col-sm-3 mui-col-xs-3';
			});
			mui('#tabs div')[tabIndex - 1].className = 'mui-col-sm-3 mui-col-xs-3 active';
			tabIndex -- ;
		}
	});

});