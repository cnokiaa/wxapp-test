var app = getApp();
var ut = require('../../utils/utils.js');
var pageObject = {
	data: {
		popshowType: true,
		msgType: false,
		time: '2',
		userMobile: '',
		verification: ''
	},
	onLoad: function() {
		app.showLoad();
		var $this = this;
		/**本地缓存异步获取relname内容**/
		wx.getStorage({
			key: 'relname',
			success: function(res) {
				$this.setData({
					relname: res.data
				})
			} 
		});
		wx.getStorage({
			key: 'bankCard',
			success: function(res) {
				$this.setData({
					bankCard: res.data
				})
			}
		});
		app.closeLoad();
	},
	/**关闭弹框**/
	closePop: function(){
		this.setData({
			popshowType: true
		});
	},
	/**显示弹框,msg传参为显示内容**/
	showPop: function(msg){
		this.setData({
			errmsgShow: msg,
			popshowType: false
		});
	},
	changeT: function(e) {
		var $index = Number(e.currentTarget.dataset.index),
		 	$value = e.detail.value,
			$id = e.currentTarget.id;
		switch($index){
			case 0:this.setData({'userMobile':$value});break;
			case 1:this.setData({'verification':$value});break;
		}
	},
	sendMsg: function() {
		var $this = this;
		if(this.data.userMobile == '') {
			return this.showPop("请输入手机号码！");
		} else {
			if(!ut.regPhone(this.data.userMobile)) {
				return $this.showPop("请输入正确的手机号");
			} else {
				this.setData({msgType : true});
				var num = this.data.time;
				var timer = setInterval(function() {
					num--;
					$this.setData({time:num});
					if(num == 0) {
						clearInterval(timer);
						$this.setData({msgType : false,time : '2'});
					}
				}, 1000);
			}
		}
	},
	submitTap: function() {
		if(this.data.userMobile == ''){
			return this.showPop("手机号不能为空");
		}
		if(!ut.regPhone(this.data.userMobile)) {
			return this.showPop("请输入正确的手机号");
		}
		if(this.data.verification == '') {
			return this.showPop("输入验证码");
		}
		wx.removeStorageSync('photo');
		/**跳转页面**/
		wx.navigateTo({
		  url: '../success/success'
		})
	}
}

Page(pageObject);