var app = getApp();
var pageObject = {
	data: {
		popshowType: true,
		wrongType: true,
		bPicType: true,
		bPicNum: 0,
		photo :['','',''],
		photoType:[true,true,true],
	},
	onLoad: function() {
		var $this = this;
		wx.getStorage({
			key: 'photo',
			success: function(res) {
				$this.setData({photo : res.data});
			} 
		})
	},
	showWrong: function() {
		this.setData({wrongType : false});
	},
	closeWrong: function() {
		this.setData({wrongType : true});
	},
	showBpic: function(e) {
		var $index = e.currentTarget.dataset.index;
		this.setData({bPicNum : $index,bPicType : false});
	},
	closeBpic: function() {
		this.setData({bPicType : true});
	},
	//关闭弹出框
	closePop: function(){
		this.setData({
			popshowType: true
		});
	},
	chooseImages: function(e){
		app.showLoad();
		var $this = this;
		var $index = Number(e.currentTarget.dataset.index);
		wx.chooseImage({
			count: 1, // 默认9
			sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
			// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				//var tempFilePaths = res.localIds[0];
				//console.log('@@@'+res.localIds[0]);
			//	$this.showLoading();
				var tempFilePaths = res.tempFilePaths;
				switch($index){
					case 0:
						$this.setData({
							'photo[0]':res.tempFilePaths[0],
							'photoType[0]': false
						});
					break;
					case 1:
						$this.setData({
							'photo[1]':res.tempFilePaths[0],
							'photoType[1]': false
						});
					break;
					case 2:
						$this.setData({
							'photo[2]':res.tempFilePaths[0],
							'photoType[2]': false
						});
					break;
				}
				app.closeLoad();
			}
		})
	},
	submitTap: function() {
		var errmsg;
		for(var i=0;i<this.data.photo.length;i++){
			if(this.data.photo[i] == ''){
				switch(i){
					case 0:
						errmsg = '请上传身份证人脸照';
					break;
					case 1:
						errmsg = '请上传身份证国徽照';
					break;
					case 2:
						errmsg = '请上传手持身份证照';
					break;
				}
				this.setData({
					errmsgShow: errmsg,
					popshowType: false
				});
				return false;
			}
		}
		wx.setStorageSync('photo', this.data.photo);
		wx.navigateTo({
		  url: '../info/info'
		})
	}
}

Page(pageObject);