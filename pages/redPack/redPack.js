var app = getApp();

var pageObject = {
	data: {
		loadTipType: false,
		scrollTop: '',
	},
	onLoad: function() {
		
	},
	lower: function(e) {console.log("lower");
		var $this = this;
		$this.setData({loadTipType : false});
		setTimeout(function(){
			$this.setData({loadTipType : true,scrollTop : Number($this.data.scrollTop) - 1});
		},2000)
	},
	scroll: function(e) {
		this.setData({scrollTop : e.detail.scrollTop});
	},
	use: function() {
		wx.navigateTo({
		  url: '../index/trialCalculate'
		})
	},
	onReachBottom: function() {
		console.log("123");
	},
}

Page(pageObject);