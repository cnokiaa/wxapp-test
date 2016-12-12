var app = getApp();
var pageObject = {
	data: {
		applyLoans : {"status":"success","errcode":"0000","errmsg":"成功","data":{"dhkData":[{"contractno":"XNW20160815023886","busstyepName":"易分期","contractstatus":"5","applyamt":"1000.00","busstyep":"YFQ","period":"27","applytime":"20160815224819"}],"shzData":[{"contractno":"XNW20160920122055","busstyepName":"易分期","contractstatus":"1","applyamt":"1000.00","busstyep":"YFQ","period":"26","applytime":"20160920114353"}],"yjaData":[],"sbddData":[{"contractno":"XNH20160615020308","busstyepName":"易分期","contractstatus":"6","applyamt":"1000.00","busstyep":"YFQ","period":"26","applytime":"20160615164022"},{"contractno":"XNH20160613020137","busstyepName":"易分期","contractstatus":"6","applyamt":"1000.00","busstyep":"YFQ","period":"26","applytime":"20160613174519"},{"contractno":"XNH20160613020132","busstyepName":"易分期","contractstatus":"6","applyamt":"20000.00","busstyep":"YFQ","period":"52","applytime":"20160613173652"},{"contractno":"XNH20160607019955","busstyepName":"易分期","contractstatus":"6","applyamt":"29999.00","busstyep":"YFQ","period":"26","applytime":"20160607114933"},{"contractno":"XNH20160607019954","busstyepName":"易分期","contractstatus":"6","applyamt":"29999.00","busstyep":"YFQ","period":"26","applytime":"20160607114517"},{"contractno":"XNH20160607019950","busstyepName":"易分期","contractstatus":"6","applyamt":"30000.00","busstyep":"YFQ","period":"26","applytime":"20160607112004"},{"contractno":"XNH20160607019946","busstyepName":"易分期","contractstatus":"6","applyamt":"30000.00","busstyep":"YFQ","period":"26","applytime":"20160607101648"},{"contractno":"XNH20160607019943","busstyepName":"易分期","contractstatus":"6","applyamt":"5432.00","busstyep":"YFQ","period":"26","applytime":"20160607093154"},{"contractno":"XNH20160606019939","busstyepName":"易分期","contractstatus":"6","applyamt":"2000.00","busstyep":"YFQ","period":"26","applytime":"20160606180954"},{"contractno":"XNH20160606019938","busstyepName":"易分期","contractstatus":"6","applyamt":"1000.00","busstyep":"YFQ","period":"26","applytime":"20160606174607"},{"contractno":"XNH20160606019937","busstyepName":"易分期","contractstatus":"6","applyamt":"5000000.00","busstyep":"YFQ","period":"26","applytime":"20160606173843"},{"contractno":"XNH20160606019936","busstyepName":"易分期","contractstatus":"6","applyamt":"1000.00","busstyep":"YFQ","period":"26","applytime":"20160606173723"},{"contractno":"XNH20160606019935","busstyepName":"易分期","contractstatus":"6","applyamt":"1000.00","busstyep":"YFQ","period":"26","applytime":"20160606173635"},{"contractno":"XNH20160606019934","busstyepName":"易分期","contractstatus":"6","applyamt":"1000000.00","busstyep":"YFQ","period":"26","applytime":"20160606171734"},{"contractno":"XNH20160602019829","busstyepName":"易分期","contractstatus":"6","applyamt":"1000.00","busstyep":"YFQ","period":"26","applytime":"20160602164207"},{"contractno":"XNH20160602019828","busstyepName":"易分期","contractstatus":"6","applyamt":"1000.00","busstyep":"YFQ","period":"26","applytime":"20160602164128"},{"contractno":"XNH20160531019677","busstyepName":"易分期","contractstatus":"2","applyamt":"8888.00","busstyep":"YFQ","period":"26","applytime":"20160531142956"},{"contractno":"XNH20160531019651","busstyepName":"易分期","contractstatus":"6","applyamt":"1111.00","busstyep":"YFQ","period":"26","applytime":"20160531095901"},{"contractno":"XNH20160531019649","busstyepName":"易分期","contractstatus":"6","applyamt":"1000.00","busstyep":"YFQ","period":"26","applytime":"20160531095303"},{"contractno":"XNA20160401017158","busstyepName":"易分期","contractstatus":"6","applyamt":"1000.00","busstyep":"YFQ","period":"52","applytime":"20160401155548"}]}},
		dataIndex : 0,
		downMsg : '下拉刷新'
	},
	onLoad: function() {
		app.showLoad();
		this.showData();
	},
	onPullDownRefresh: function(e) {
		this.setData({downMsg : '下拉刷新'});
		this.setData({downMsg : '正在刷新'});
		this.setData({downMsg : '刷新成功'});
		wx.stopPullDownRefresh();
	},
	tabTap: function(e) {
		app.showLoad();
		var $index = Number(e.currentTarget.dataset.index);
		this.setData({dataIndex:$index});
		this.showData();
	},
	showData : function() {
		var $index = this.data.dataIndex;
		switch(this.data.dataIndex) {
			case 0:
				this.setData({dataArray:this.data.applyLoans.data.dhkData});
			break;
			case 1:
				this.setData({dataArray:this.data.applyLoans.data.shzData});
			break;
			case 2:
				this.setData({dataArray:this.data.applyLoans.data.yjaData});
			break;
			case 3:
				this.setData({dataArray:this.data.applyLoans.data.sbddData});
			break;
		}
		var timeArray = [];
		for(var i = 0; i < this.data.dataArray.length; i ++) {
			this.data.dataArray[i].applytime = this.turnTime(this.data.dataArray[i].applytime);
		}
		this.setData({dataArray : this.data.dataArray});
		app.closeLoad();
	},
	// 时间格式转换
	turnTime: function(time) {
		var timeStr = time;
		if(time.length >= 8) {
			if(timeStr.match(/^\d{8}/gi)) {
				timeStr = timeStr.match(/^\d{8}/gi)[0];
				var year = timeStr.slice(0,4);
				var month = timeStr.slice(4,6);
				var day = timeStr.slice(6,8);
				timeStr = year + "-" + month + "-" + day;
			}
		}
		return timeStr;
	},
	litap: function(e) {console.log(1);
		var contractstatus = e.currentTarget.dataset.contractstatus,
			contractno = e.currentTarget.dataset.contractno,
			recordData = contractno+"|"+contractstatus;
		wx.setStorageSync("record",recordData);
		wx.navigateTo({
		  url: '../orderDetail/orderDetail'
		})
	}
}


Page(pageObject);