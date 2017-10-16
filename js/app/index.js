var aniShow = {};
mui.init({
	swipeBack: true //启用右滑关闭功能
});
mui.plusReady(function() {
	var self = plus.webview.currentWebview(),
		nviews = self.getSubNViews(),
		subpages = util.options.subpages,
		tnviews = self.getTitleNView(),
		leftPos = Math.ceil((window.innerWidth - 60) / 2); // 设置凸起大图标为水平居中
	
	//系统状态栏前景色设置为白色（字体颜色为白色）
	plus.navigator.setStatusBarStyle('light');
	
	//取消首页滚动条显示
	self.setStyle({
		scrollIndicator: 'none'
	});
	
	//初始化轮播组件
	var gallery = mui('.mui-slider');
	gallery.slider({
	  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
	});
	
	
	var statusbarH = 45;
	//由于采用了系统状态栏沉浸效果需要计算系统状态栏的高度
    if(plus.navigator.isImmersedStatusbar()){// 兼容immersed状态栏模式
        // 获取状态栏高度并根据业务需求处理，这里重新计算了子窗口的偏移位置
        statusbarH=(Math.round(plus.navigator.getStatusbarHeight()));
    }
	
	var topoffset= statusbarH + "px";
	
	//绘制搜索条控件
    var searchBgW = (window.innerWidth - 100) + 'px';
    var searchKeyW = (window.innerWidth - 100 - 25) + 'px';
    var searchNv = util.drawNative('searchNv', {
		top: (statusbarH + 5 ) + 'px',
		left: '50px',
		right: '50px',
		width: searchBgW,
		height: '30px',
		position: 'dock'
	}, [{
		tag: 'rect',
		id: 'searchNv1',
		position: {
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%'
		},
		rectStyles: {
			color: '#fff',
			radius: '20%'
		}
	},{
		tag: 'font',
		id: 'searchNv2',
		text: '\ue631',
		position: {
			top: '0px',
			left: '5px',
			width: '20px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#17abe3',
			size: '14px'
		}
	},{
		tag: 'font',
		id: 'searchNv3',
		text: '输入关键字...',
		position: {
			top: '0px',
			left: '25px',
			width: searchKeyW,
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'left',
			color: '#707070',
			size: '14px'
		}
	}]);
    
    self.append(searchNv);
	
	
	/**	
	 * drawNativeIconBg 绘制带边框的半圆，
	 * 实现原理：
	 *   id为bg的tag 创建带边框的圆
	 *   id为bg2的tag 创建白色矩形遮住圆下半部分，只显示凸起带边框部分
	 *   注意创建先后顺序，创建越晚的层级越高
	 */
	var scanNv = util.drawNative('scanNv', {
		bottom: '5px',
		left: leftPos + 'px',
		width: '60px',
		height: '60px',
		position: 'dock'
	}, [{
		tag: 'rect',
		id: 'scanNv1',
		position: {
			top: '1px',
			left: '0px',
			width: '100%',
			height: '100%'
		},
		rectStyles: {
			color: '#fff',
			radius: '50%',
			borderColor: '#ccc',
			borderWidth: '1px'
		}
	}, {
		tag: 'rect',
		id: 'scanNv2',
		position: {
			bottom: '-0.5px',
			left: '0px',
			width: '100%',
			height: '45px'
		},
		rectStyles: {
			color: '#fff'
		}
	}]);

	/**
	 * 凸起图标最后创建  浮在最顶层
	 *	id为iconBg的红色背景图
	 * 	id为icon的字体图标
	 * 	
	 */
	var scanNvIcon = util.drawNative('scanNvIcon', {
		bottom: '10px',
		left: leftPos + 5 + 'px',
		width: '50px',
		height: '51px',
		position: 'dock' //此种停靠方式表明该控件应浮在窗口最上层，以免被其他窗口遮住
	}, [{
			tag: 'rect',
			id: 'scanNvIcon1',
			position: {
				top: '0px',
				left: '0px',
				width: '50px',
				height: '50px'
			},
			rectStyles: {
				color: '#17abe3',
				radius: '50%'
			}
		},
		{
			tag: 'font',
			id: 'scanNvIcon2',
			text: '\ue654', //此为字体图标Unicode码'\e600'转换为'\ue600'
			position: {
				top: '0px',
				left: '0px',
				width: '50px',
				height: '100%'
			},
			textStyles: {
				fontSrc: '_www/fonts/iconfont.ttf',
				align: 'center',
				color: '#fff',
				size: '30px'
			}
		}
	]);
	// append 到父webview中
	self.append(scanNv);
	self.append(scanNvIcon);

	//自定义监听扫一扫图标点击事件
	scanNvIcon.addEventListener('click', function(e) {
		var scanWV = plus.webview.create('html/barcode_scan.html', 'scan');
		scanWV.show('slide-in-right', 200);
	});

	//创建子webview窗口 并初始化
	util.initSubpage(topoffset);

	var activePage = plus.webview.currentWebview();

	//给每个view 添加监听点击切换
	for(var i = 0; i < nviews.length; i++) {
		nviews[i].addEventListener('click', function(e) {
			var currId = e.target.id,
				currIndex = parseInt(currId.substr(currId.length - 1, 1) - 1),
				currView = self.getStyle().subNViews[currIndex];

			// 匹配对应tab窗口
			if(currIndex > 0) {
				targetPage = plus.webview.getWebviewById(subpages[currIndex - 1]);
			} else {
				targetPage = plus.webview.currentWebview();
			}

			if(targetPage == activePage) {
				return;
			}

			//底部选项卡切换
			util.toggleNview(currView, currIndex);
			// 子页面切换
			util.changeSubpage(targetPage, activePage);
			//更改当前活跃的页面
			activePage = targetPage;
			
			if(currIndex !== 0){
				tnviews.hide();
				searchNv.hide();
			}else{
				tnviews.show();
				searchNv.show();
			}
		}, false);
	}
});