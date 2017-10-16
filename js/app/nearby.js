mui.init({
	swipeBack: false,
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh,
			style: 'circle',
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});

mui.plusReady(function() {
	var self = plus.webview.currentWebview();

	self.setPullToRefresh({
		support: true,
		offset: '0px',
		style: 'circle',
		color: '#17abe3'
	});

	var statusbarH = 44;
	//由于采用了系统状态栏沉浸效果需要计算系统状态栏的高度
	if(plus.navigator.isImmersedStatusbar()) { // 兼容immersed状态栏模式
		// 获取状态栏高度并根据业务需求处理，这里重新计算了子窗口的偏移位置
		statusbarH = (Math.round(plus.navigator.getStatusbarHeight()));
	}
	
	//状态栏下的标题栏
	var titleNv = util.drawNative('titleNv', {
		top: (statusbarH + 5) + 'px',
		left: '0px',
		right: '0px',
		width: '100%',
		height: '44px',
		position: 'dock'
	}, [{
		tag: 'font',
		id: 'titleNv1',
		text: '附近',
		position: {
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%'
		},
		textStyles: {
			fontSrc: '_www/fonts/iconfont.ttf',
			align: 'center',
			color: '#fff',
			size: '16px',
			weight: 'bold'
		}
	}]);
	self.append(titleNv);
	
	//定位按钮
	var locationNv = util.drawNative('locationNv', {
		top: (statusbarH + 5) + 'px',
		left: '0px',
		right: '0px',
		width: '120px',
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
	},{
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
});

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for(var i = cells.length, len = i + 3; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
			//下拉刷新，新纪录插到最前面；
			table.insertBefore(li, table.firstChild);
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		mui.toast('下拉刷新成功');
	}, 1000);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for(var i = cells.length, len = i + 20; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
			table.appendChild(li);
		}
	}, 1000);
}