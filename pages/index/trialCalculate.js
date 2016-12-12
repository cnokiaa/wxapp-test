var app = getApp();
var pageObject = {
	data: {
		applyment: '',
		limitMin: '',
		limitMax: '',
		zhouqi: '',
		errmsgShow:'',
		popshowType: true,
		//loadingType: false,
		detType: true,
		zqData: {},
		curIndex: -1,
		disabled: true,
		conType: true,
		product: {"status":"success","errcode":"0000","errmsg":"成功","data":{"systime":"2016-11-01 13:39:47","sid":"886454F107A64A19BDD35E8E6D4E5890","ratelist":[{"periods":3,"rate":500.0,"productno":"PP01","periodlen":1,"lenunit":"Y"},{"periods":6,"rate":1000.0,"productno":"PP02","periodlen":1,"lenunit":"M"}],"hiappamt":1000000,"orgid":"orgfls","ismark":0,"hasdebt":"N","discrate":0,"lowappamt":10000,"mobile":"13534343434","busid":"queryproducts"}},
		plan: {
			    "status": "success",
			    "data": {
			        "accountMoney": "1110.60",
			        "eachMoneyBFredPacket": "0.00",
			        "eachMoney": "205.66",
			        "dueTime": "1",
			        "oneOffPayment": "123.40",
			        "totalMoney": "1234.00",
			        "discount": "0.00",
			        "feeFlag": "YCX",
			        "hongbao":"12.00",
			        "time":"20150202"
			    }
			},

	},
	/*onPullDownRefresh: function(){
		wx.stopPullDownRefresh();
	},*/
	onLoad: function() {
		app.showLoad();
		var $this = this;
		/**获取周期**/		
		var zq = [],
			proData = this.data.product.data;
		for(var i = 0; i < proData.ratelist.length; i++) {
			switch(proData.ratelist[i].lenunit){
				case 'D':proData.ratelist[i].lenunit = '天';break;
				case 'W':proData.ratelist[i].lenunit = '周';break;
				case 'M':proData.ratelist[i].lenunit = '月';break;
				case 'Y':proData.ratelist[i].lenunit = '年';break;
			}
			zq[i] = proData.ratelist[i];
		}	
		$this.setData({
			limitMin:proData.lowappamt,
			limitMax:proData.hiappamt,
			zhouqi:zq
		});

		/*wx.request({
			url: app.getBasePath() + '/json/product.json',
			method: 'GET',
			success: function(data) {
				var data = data.data;
				if(data.status == "success") {
					var rateDate = data.data.ratelist;
					var zq = [];
					for(var i = 0; i < data.data.ratelist.length; i++) {console.log(data.data.ratelist[i]);
						switch(data.data.ratelist[i].lenunit){
							case 'D':data.data.ratelist[i].lenunit = '天';break;
							case 'W':data.data.ratelist[i].lenunit = '周';break;
							case 'M':data.data.ratelist[i].lenunit = '月';break;
							case 'Y':data.data.ratelist[i].lenunit = '年';break;
						}
						zq[i] = data.data.ratelist[i];
					}	
					$this.setData({
						limitMin:data.data.lowappamt,
						limitMax:data.data.hiappamt,
						zhouqi:zq
					});
				} else {
					$this.showPop(data.data.errmsg);
				}
			}
		});*/

		wx.getStorage({
			key: "applyment",
			success: function(res) {
				$this.setData({
					applyment: res.data,
				})
			} 
		});
		wx.getStorage({
			key: 'curIndex',
			success: function(res) {
				if(res.data > -1) {
					$this.setData({curIndex: res.data});
					$this.setData({detType:false,zqData:$this.data.plan.data,disabled: false});
				}
				//$this.setData({loadingType:true,disabled: false});			
			} 
		});
		app.closeLoad();
	},
	showcon: function(e) {
		if(e.currentTarget.dataset.show == 'true') {
			this.setData({conType:false});
		} else {
			this.setData({conType:true});
		}
	},
	yewu: function() {
		/*wx.navigateTo({
		  url: '../record/record'
		})*/
	},
	redpack: function() {
		wx.navigateTo({
			url: '../redPack/redPack'
		});
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
	inputFocus: function() {
		this.setData({curIndex:-1,detType:true,disabled:true});
	},
	/**同步input输入的值**/
	changeT: function(e) {
		var $value = e.detail.value;
		this.setData({applyment:$value});
		if($value > this.data.limitMax || $value < this.data.limitMin) {
			this.showPop("最低" + this.data.limitMin + "元，最高" + this.data.limitMax + "元");
			this.setData({curIndex:-1,detType:true});
			return false;
		}
	},
	/**选择周期**/
	chooseZq: function(e) {
		var $this = this;
		if(this.data.applyment == ''){
			return $this.showPop('请输入金额');
		} else if(this.data.applyment > this.data.limitMax || this.data.applyment < this.data.limitMin) {
			this.showPop("最低" + this.data.limitMin + "元，最高" + this.data.limitMax + "元");
			this.setData({curIndex:-1,detType:true});
			return false;
		} else {
			app.showLoad();
			$this.setData({curIndex:e.currentTarget.dataset.no,disabled: false});


			this.setData({detType:false,zqData:this.data.plan.data});
			
			/*wx.request({
				url: app.getBasePath() + '/json/plan.json',
				method: "get",
				success: function(data) {
					var data = data.data;
					if(data.status == 'success'){
						console.log(data.data);
						$this.setData({detType:false,zqData:data.data});
					}
				}
			});*/
			/**将数据同步放入缓存中**/
			wx.setStorageSync("applyment",$this.data.applyment);
			wx.setStorageSync("curIndex",$this.data.curIndex);
			app.closeLoad();
		}
	},
	submitBt: function() {
		var data = this.data;
		if(data.disabled == false) {
			if(data.applyment > data.limitMax || data.applyment < data.limitMin) {
				return this.showPop("最低" + data.limitMin + "元，最高" + data.limitMax + "元");
			}
			if(data.curIndex < 0) {
				return this.showPop("请选择周期");
			}
			
			/**跳转页面**/
			wx.navigateTo({
			  url: '../upImages/uploadImages'
			})
		}
	},
	goRecord: function() {
		wx.navigateTo({
		  url: '../record/record'
		})
	}
}

Page(pageObject);