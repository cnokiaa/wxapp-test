var app = getApp();
var pageObject = {
	data: {
		relname: '',
		index: [0,1],
		bankList: {"data":{"sid":"8309125BA39C46CDB282A51877463224","retData":[{"bankName":"农业银行","bankCode":"01030000"},{"bankName":"中国银行","bankCode":"01040000"},{"bankName":"建设银行","bankCode":"01050000"},{"bankName":"交通银行","bankCode":"03010000"},{"bankName":"中信银行","bankCode":"03020000"},{"bankName":"光大银行","bankCode":"03030000"},{"bankName":"华夏银行","bankCode":"03040000"},{"bankName":"广发银行","bankCode":"03060000"},{"bankName":"招商银行","bankCode":"03080000"},{"bankName":"兴业银行","bankCode":"03090000"},{"bankName":"浦东银行","bankCode":"03100000"},{"bankName":"平安银行","bankCode":"04105840"},{"bankName":"广州银行","bankCode":"04135810"}],"busid":"queryBankList"},"status":"success","errcode":"0000","errmsg":"成功"},
		bankCard: ['',''],
		popshowType: true,
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
			key: 'bankIndex',
			success: function(res) {
				$this.setData({
					index: res.data
				})
			} 
		});
		var banklist = [];
		for(var i = 0;i < this.data.bankList.data.retData.length; i ++) {
			banklist[i] = this.data.bankList.data.retData[i].bankName;
		}
		$this.setData({bank: banklist});
		/**请求银行卡列表**/
		/*wx.request({
			url: app.getBasePath() + '/json/debitBankList.json',
			method: 'GET',
			success: function(res) {
				var banklist = [];
				for(var i = 0;i < res.data.data.retData.length; i ++) {
					banklist[i] = res.data.data.retData[i].bankName;
				}
				$this.setData({bank: banklist});
			}
		})*/
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
		var $index = Number(e.currentTarget.dataset.index);
		switch($index) {
			case 0:this.setData({'bankCard[0]':e.detail.value});break;
			case 1:this.setData({'bankCard[1]':e.detail.value});break;
		}
	},
	bindPickerChange: function(e) {
		var $index = Number(e.currentTarget.dataset.index);
		switch($index) {
			case 0:this.setData({'index[0]':e.detail.value});break;
			case 1:this.setData({'index[1]':e.detail.value});break;
		} 
	},
	submitTap: function() {
		if(this.data.bankCard[0] == '') {
			return this.showPop('信用卡不能为空');
		}
		if(this.data.bankCard[1] == '') {
			return this.showPop('储蓄卡不能为空');
		}
		if(!/^\d{12,20}$/.test(this.data.bankCard[0])) {
			return this.showPop("请输入正确的信用卡卡号");
		}
		if(!/^\d{12,20}$/.test(this.data.bankCard[1])) {
			return this.showPop("请输入正确的储蓄卡卡号");
		}
		wx.setStorageSync('bankCard', this.data.bankCard);		/**将relname同步放入缓存中**/
		wx.setStorageSync('bankIndex', this.data.index);
		/**跳转页面**/
		wx.navigateTo({
		  url: '../apply/apply'
		})
	}
}

Page(pageObject);