var app = getApp();

var pageObject = {
	data: {
		contractstatus: '6',
		it:{
			 	"contractno" : "123",	//合同号
				"businesstype" : "替你还", //业务名称

				"applydate" : "20160104",	 //申请日期
				"period" : "12",		//申请周期
				"loantime" : "20160210",		//放款日期
				"currentDate" : "20160505",	 //本期还款日
				"currentPeriod" : "12",		//本期期数
				"loantime" : "20161412",		//放款日期
				"endtime" : "20180510",		//结案日期
				"yqDate" : "20162825",		//逾期日期

				"applyamt" : "1234.00",	 //申请金额
				"account" : "1245.00",	//到账金额
				"loan" :　"456.00",		//借款金额
				"repcountamt" : "456.00",		//已还金额(实际还款总额)
				"onemoney" : "12.00",		//一次性服务费
				"freemoney" : "11.00",	//红包抵扣金额
				"currentPay" : "123.00",		//本期已还款
				"currentAmt" : "123.05",		//本期待还款
				"unsettled" : "8888.00",		//剩余待还金额
				"yqMoney" : "456.00",			//逾期未还款

				"xykcard" : "44012121212121",  //放款信用卡
				"cvkcard" : "45454545454545",  //还款储蓄卡

				"bujianType" : "1"	//补件类型
			},
	},
	onLoad: function() {
		app.showLoad();
		var $this = this;
		wx.getStorage({
			key: 'record',
			success: function(res) {
				$this.setData({
					'it.contractno' : res.data.split("|")[0],
					contractstatus : res.data.split("|")[1]
				})
				app.closeLoad();
			} 
		});
	},
	call: function() {
		wx.makePhoneCall({
			phoneNumber: '95016', //此号码并非真实电话号码，仅用于测试
			success:function(){
				console.log("拨打电话成功！")
			},
			fail:function(){
				console.log("拨打电话失败！")
			}
		})
	}
}

Page(pageObject);