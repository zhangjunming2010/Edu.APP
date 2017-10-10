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
		
	
	//由于采用了系统状态栏沉浸效果需要计算系统状态栏的高度
    var topoffset="45px";
    if(plus.navigator.isImmersedStatusbar()){// 兼容immersed状态栏模式
        // 获取状态栏高度并根据业务需求处理，这里重新计算了子窗口的偏移位置
        topoffset=(Math.round(plus.navigator.getStatusbarHeight()))+"px";
    }
	//绘制地区按钮及显示
	var locationNativeIcon = util.drawNative('location', {
		top: topoffset,
		left: '5px',
		width: '80px',
		height: '44px',
		position: 'dock' //此种停靠方式表明该控件应浮在窗口最上层，以免被其他窗口遮住

	}, [{
		tag: 'font',
		id: 'locationicontext',
		text: '重庆',
		position: {
			top: '0px',
			left: '5px',
			width: '50px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#fff',
			size: '14px',
			weight: 'bold'
		}
	},{
		tag: 'font',
		id: 'locationicon',
		text: '\ue7a2',
		position: {
			top: '0px',
			left: '50px',
			width: '20px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#fff',
			size: '12px'
		}
	}]);
	searchIconwi = window.innerWidth - 200;
	leftoffset = searchIconwi / 2;
	//绘制搜索框输入框体
	var searchNativeBg = util.drawNative('search', {
		top: topoffset,
		left: leftoffset,
		width: searchIconwi + 'px',
		height: '44px',
		position: 'dock' //此种停靠方式表明该控件应浮在窗口最上层，以免被其他窗口遮住

	}, [{
		tag: 'rect',
		id: 'searchBg',
		position: {
			top: '8px',
			left: '0px',
			width: '100%',
			height: '28px'
		},
		rectStyles: {
			color: '#fff',
			radius: '50%'
		}
	}]);
	//绘制搜索框搜索样式图标
	var searchNativeIcon = util.drawNative('searchIcon', {
		top: topoffset,
		left: (leftoffset + 5 ) +'px',
		width: searchIconwi + 'px',
		height: '44px',
		position: 'dock' //此种停靠方式表明该控件应浮在窗口最上层，以免被其他窗口遮住
	}, [{
		tag: 'font',
		id: 'searchIconT',
		text: '\ue631',
		position: {
			top: '0px',
			left: '0px',
			width: '20px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#707070',
			size: '14px'
		}
	},{
		tag: 'font',
		id: 'searchKey',
		text: '输入关键字...',
		position: {
			top: '0px',
			left: '22px',
			width: '80px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#000',
			size: '14px'
		}
	}]);
	//绘制右上角更多菜单图标
	var plusNativeIcon = util.drawNative('plusIcon', {
		top: topoffset,
		right: '20px',
		width: '30px',
		height: '44px',
		position: 'dock' //此种停靠方式表明该控件应浮在窗口最上层，以免被其他窗口遮住
	}, [{
		tag: 'font',
		id: 'plusIconT',
		text: '\ue6c9',
		position: {
			top: '0px',
			left: '0px',
			width: '30px',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#fff',
			size: '26px',
		}
	}]);
	self.append(locationNativeIcon);
	self.append(searchNativeBg);
	self.append(searchNativeIcon);
	self.append(plusNativeIcon);
	
	//自定义监听地址点击事件
	locationNativeIcon.addEventListener('click', function(e) {
		
	});
	//自定义监听搜索域点击事件
	searchNativeBg.addEventListener('click', function(e) {
		
	});
	//自定义监听更多图标点击事件
	plusNativeIcon.addEventListener('click', function(e) {
		mui('#topPopover').popover('toggle');
	});
	
	/**	
	 * drawNativeIconBg 绘制带边框的半圆，
	 * 实现原理：
	 *   id为bg的tag 创建带边框的圆
	 *   id为bg2的tag 创建白色矩形遮住圆下半部分，只显示凸起带边框部分
	 *   注意创建先后顺序，创建越晚的层级越高
	 */
	var drawNativeIconBg = util.drawNative('iconBg', {
		bottom: '5px',
		left: leftPos + 'px',
		width: '60px',
		height: '60px',
		position: 'dock'
	}, [{
		tag: 'rect',
		id: 'bg',
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
		id: 'bg2',
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
	var drawNativeIcon = util.drawNative('tabIcon', {
		bottom: '10px',
		left: leftPos + 5 + 'px',
		width: '50px',
		height: '51px',
		position: 'dock' //此种停靠方式表明该控件应浮在窗口最上层，以免被其他窗口遮住

	}, [{
			tag: 'rect',
			id: 'iconBg',
			position: {
				top: '0px',
				left: '0px',
				width: '50px',
				height: '50px'
			},
			rectStyles: {
				color: '#d74b28',
				radius: '50%'
			}
		},
		{
			tag: 'font',
			id: 'scan',
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
	self.append(drawNativeIconBg);
	self.append(drawNativeIcon);

	//自定义监听扫一扫图标点击事件
	drawNativeIcon.addEventListener('click', function(e) {
		plus.webview.open('html/barcode_scan.html', 'new', {}, 'slide-in-right', 200);
	});

	//创建子webview窗口 并初始化
	util.initSubpage();
	var activePage = plus.webview.currentWebview();

	//fixed 是否添加titleNView
	if(self.getTitleNView()) {
		indexNum = 1
	} else {
		indexNum = 0
	}

	//给每个view 添加监听点击切换
	for(var i = 0 + indexNum; i < (4 + indexNum); i++) {
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

			if(currIndex !== 3) {
				if(currIndex == 0){
					//激活首页显示搜索等绘制图形
					locationNativeIcon.show();
					searchNativeBg.show();
					searchNativeIcon.show();
					plusNativeIcon.show();
				}else{
					//隐藏首页的搜索等绘制图形
					locationNativeIcon.hide();
					searchNativeBg.hide();
					searchNativeIcon.hide();
					plusNativeIcon.hide();
				}
				//底部选项卡切换
				util.toggleNview(currView, currIndex);
				// 子页面切换
				util.changeSubpage(targetPage, activePage);
				//更改当前活跃的页面
				activePage = targetPage;
			} else {
				//第四个tab 打开新窗口
				plus.webview.open('html/new-webview.html', 'new', {}, 'slide-in-right', 200);
			}
		}, false);
	}
});