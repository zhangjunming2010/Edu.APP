var flashon = false;
mui.init();
mui.plusReady(function() {
	//获取当前view
	var self = plus.webview.currentWebview();
	//获取view的打开者
	//			   var wo=self.opener();
	//绘制扫描二维码页面的返回按钮
	var backNativeIcon = util.drawNative('scanback', {
		top: '25px',
		left: '30px',
		width: '25px',
		height: '25px',
		position: 'dock' //此种停靠方式表明该控件应浮在窗口最上层，以免被其他窗口遮住

	}, [{
		tag: 'font',
		id: 'scanback1',
		text: '\ue7a1', //此为字体图标Unicode码'\e600'转换为'\ue600'
		position: {
			top: '0px',
			left: '0px',
			width: '25px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#e5e5e5',
			size: '24px'
		}
	}]);
	//绘制扫描二维码页面的闪关灯按钮
	var flashNativeIcon = util.drawNative('scanflash', {
		top: '25px',
		right: '30px',
		width: '25px',
		height: '25px',
		position: 'dock' //此种停靠方式表明该控件应浮在窗口最上层，以免被其他窗口遮住

	}, [{
		tag: 'font',
		id: 'scanflashicon',
		text: '\ue617', //此为字体图标Unicode码'\e600'转换为'\ue600'
		position: {
			top: '0px',
			left: '0px',
			width: '25px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#e5e5e5',
			size: '25px'
		}
	}]);
	//初始化二维码扫描组件
	var filters = [plus.barcode.QR, plus.barcode.AZTEC];
	var sytyles = {
		frameColor: '#d74b28',
		scanbarColor: 'd74b28'
	};
	var scan = new plus.barcode.Barcode('bcid', filters, sytyles);
	scan.onmarked = onmarked;
	scan.onerror = onerror;
	scan.start({
		conserve: false,
		filename: '_doc/barcode/',
		vibrate: false
	});
	// 二维码扫描成功
	function onmarked(type, result, file) {
		result = result.replace(/\n/g, '');
		console.log(type);
		console.log(result);
		console.log(file);
		scan.close();
		self.close();
	}
	//二维码扫描失败
	function onerror() {
		mui.alert('识别二维码错误！');
	}
	// append按钮到父webview中
	self.append(backNativeIcon);
	self.append(flashNativeIcon);
	//自定义按钮事件
	backNativeIcon.addEventListener('click', function(e) {
		scan.close();
		self.close();
	});
	flashNativeIcon.addEventListener('click', function(e) {
		if(!flashon) {
			flashNativeIcon.drawText('\ue618', {}, {
				fontSrc: '_www/fonts/iconfont.ttf',
				align: 'center',
				color: '#e5e5e5',
				size: '25px'
			}, 'scanflashicon');
			scan.setFlash(true);
			flashon = true;
		} else {
			flashNativeIcon.drawText('\ue617', {}, {
				fontSrc: '_www/fonts/iconfont.ttf',
				align: 'center',
				color: '#e5e5e5',
				size: '25px'
			}, 'scanflashicon');
			flashon = false;
			scan.setFlash(false);
		}
	});
});