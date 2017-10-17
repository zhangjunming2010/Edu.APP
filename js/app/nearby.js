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

	//幼教tab
	var babyNv = util.drawNative('babyNv', {
		top: (statusbarH + 44) + 'px',
		left: '0px',
		right: '0px',
		width: '26%',
		height: '36px',
		position: 'dock'
	}, [{
		tag: 'font',
		id: 'babyNv1',
		text: '幼教',
		position: {
			width: '100%',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#17abe3',
			size: '16px',
		}
	}, {
		tag: 'rect',
		id: 'babyNv2',
		position: {
			bottom: '0',
			width: '100%',
			height: '2px'
		},
		rectStyles: {
			color: '#17abe3'
		}
	}]);
//	self.append(babyNv);

	//小学tab
	var primaryNv = util.drawNative('primaryNv', {
		top: (statusbarH + 44) + 'px',
		left: '26%',
		width: '26%',
		height: '36px',
		position: 'dock'
	}, [{
		tag: 'font',
		id: 'primaryNv1',
		text: '小学',
		position: {
			width: '100%',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#707070',
			size: '16px',
		}
	}]);
//	self.append(primaryNv);

	//初中tab
	var juniorNv = util.drawNative('juniorNv', {
		top: (statusbarH + 44) + 'px',
		left: '52%',
		width: '26%',
		height: '36px',
		position: 'dock'
	}, [{
		tag: 'font',
		id: 'juniorNv1',
		text: '初中',
		position: {
			width: '100%',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#707070',
			size: '16px',
		}
	}]);
//	self.append(juniorNv);

	//tab
	var allNv = util.drawNative('allNv', {
		top: (statusbarH + 44) + 'px',
		left: '78%',
		width: '26%',
		height: '36px',
		position: 'dock'
	}, [{
		tag: 'font',
		id: 'allNv1',
		text: '全部',
		position: {
			width: '100%',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#707070',
			size: '16px',
		}
	}]);
//	self.append(allNv);
	
	var tabIndex = 0;

	//添加左右切换tab功能
	document.addEventListener("swipeleft", function() {
		mui('#tabs div')
	});
	document.addEventListener("swiperight", function() {
		
	});

});