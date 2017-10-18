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
	
	//区域滚动初始化
	mui('#pullrefresh').scroll({
		scrollY: true, //是否竖向滚动
		scrollX: false, //是否横向滚动
		startX: 0, //初始化时滚动至x
		startY: 0, //初始化时滚动至y
		indicators: false, //是否显示滚动条
		deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
		bounce: true //是否启用回弹
	});
	//区域滚动刷新初始化
	mui('#pullrefresh').pullRefresh({
		container:"#pullrefresh",
		down: {
			auto: false, //可选,默认false.首次加载自动上拉刷新一次
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			callback: pulldownRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	});
	
	//初始化第一个主标签的页面内容
	var tabW = (window.innerWidth - 50)/4;
	var tabH = 29;
	tabBtnHtml ='<div id="hot" class="mui-row">'+
						'<button type="button" class="mui-btn mui-btn-grey active" style="width:'+tabW+'px;height:'+tabH+'px;">热门</button>'+
						'<button type="button" class="mui-btn mui-btn-grey" style="width:'+tabW+'px;height:'+tabH+'px;">二级标签</button>'+
						'<button type="button" class="mui-btn mui-btn-grey" style="width:'+tabW+'px;height:'+tabH+'px;">二级标签</button>'+
						'<button type="button" class="mui-btn mui-btn-grey" style="width:'+tabW+'px;height:'+tabH+'px;">二级标签</button>'+
				'</div>'+ 
				'<div id="hot1" class="mui-row">'+
						'<button type="button" class="mui-btn mui-btn-grey" style="width:'+tabW+'px;height:'+tabH+'px;">二级标签</button>'+
						'<button type="button" class="mui-btn mui-btn-grey" style="width:'+tabW+'px;height:'+tabH+'px;">二级标签</button>'+
						'<button type="button" class="mui-btn mui-btn-grey" style="width:'+tabW+'px;height:'+tabH+'px;">二级标签</button>'+
						'<button type="button" class="mui-btn mui-btn-grey" style="width:'+tabW+'px;height:'+tabH+'px;">二级标签</button>'+
				'</div>';
	
	
	//tab切换相关
	var tabIndex = 0;
	
	var item = document.getElementById('pullrefresh').querySelector('.mui-scroll');
	var html = '<ul class="mui-table-view"><li class="mui-table-view-cell">第二个选项卡子项-1</li><li class="mui-table-view-cell">第二个选项卡子项-2</li><li class="mui-table-view-cell">第二个选项卡子项-3</li><li class="mui-table-view-cell">第二个选项卡子项-4</li><li class="mui-table-view-cell">第二个选项卡子项-5</li></ul>';
	html = tabBtnHtml + html;
	//点击切换事件
	mui('#tabs div').each(function(){
		var tab = this;
		tab.addEventListener('click',function(){
			tabIndex = tab.id;
			mui('#tabs div').each(function() {
				this.className = 'mui-col-sm-3 mui-col-xs-3';
			});
			mui('#tabs div')[tab.id].className = 'mui-col-sm-3 mui-col-xs-3 active';
			mui('.mui-scroll')[0].innerHTML = '<div class="mui-loading"><div class="mui-spinner"></div></div>';
			if(item.querySelector('.mui-loading')) {
				setTimeout(function() {
					mui('.mui-scroll')[0].innerHTML = html;
				}, 1000);
			}
		});
	});
	
	document.addEventListener("swipeleft", function() {
		if(tabIndex < mui('#tabs div').length - 1){
			mui('#tabs div').each(function(){
				this.className = 'mui-col-sm-3 mui-col-xs-3';
			});
			tabIndex ++;
			mui('#tabs div')[tabIndex].className = 'mui-col-sm-3 mui-col-xs-3 active';
			mui('.mui-scroll')[0].innerHTML = '<div class="mui-loading"><div class="mui-spinner"></div></div>';
			if(item.querySelector('.mui-loading')) {
				setTimeout(function() {
					mui('.mui-scroll')[0].innerHTML = html;
				}, 1000);
			}
		}
	});
	document.addEventListener("swiperight", function() {
		if(tabIndex > 0){
			mui('#tabs div').each(function(){
				this.className = 'mui-col-sm-3 mui-col-xs-3';
			});
			tabIndex --;
			mui('#tabs div')[tabIndex].className = 'mui-col-sm-3 mui-col-xs-3 active';
			mui('.mui-scroll')[0].innerHTML = '<div class="mui-loading"><div class="mui-spinner"></div></div>';
			if(item.querySelector('.mui-loading')) {
				setTimeout(function() {
					mui('.mui-scroll')[0].innerHTML = html;
				}, 1000);
			}
		}
	});

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
