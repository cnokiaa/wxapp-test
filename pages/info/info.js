var app = getApp();
var ut = require('../../utils/utils.js');
var plist = [],plistid = [];
var pageObject = {
	data: {
		relname: '',
		apcrnames: [],
		guanxi: ["父母","夫妻","兄弟姐妹","子女"],
    	index:['0','0','1','0','0','0'],
    	tipimg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ4AAAAVCAYAAAB2fIigAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3QkYxODQ2MjExRTAxMUU2OENBRkY5MjU1MDhGNjJBRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3QkYxODQ2MzExRTAxMUU2OENBRkY5MjU1MDhGNjJBRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdCRjE4NDYwMTFFMDExRTY4Q0FGRjkyNTUwOEY2MkFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdCRjE4NDYxMTFFMDExRTY4Q0FGRjkyNTUwOEY2MkFGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+LtgXkQAADK1JREFUeNrsXY1x47gO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',
    	info:['','','','','','','','','','','213','4444555599999'],
    	zs: [{
	    		"relname" : "123",
	    		"idcard" : "",
	    		"mail" : "",
	    		"address" : "",
	    		"detaddr" : "",
	    		"company" : "",
	    		"companycity" : "",
	    		"companyaddr" : "",
	    		"companytel" : "",
	    		"contactrelation" : "",
	    		"relationshipname" : "",
	    		"relationshiptel" : "",
	    		"emergencyrelation" : "",
	    		"contactsname" : "",
	    		"contactstel" : "",
	    		"usermobile" : ""
    		}],
    	popshowType: true,
    	errmsgShow:'',
    	scrollType: true,
    	selectIndex: '0',
    	scrollTop: '0',
    	jz:'选择您居住城市',
    	dw: '选择您单位城市',
    	bz: '',
    	shen: {"status":"success","errcode":"0000","errmsg":"成功","data":{"provinces":[{"provincecn":"黑龙江省","provinceid":"230000"},{"provincecn":"湖南省","provinceid":"430000"},{"provincecn":"四川省","provinceid":"510000"},{"provincecn":"辽宁省","provinceid":"210000"},{"provincecn":"安徽省","provinceid":"340000"},{"provincecn":"福建省","provinceid":"350000"},{"provincecn":"天津市","provinceid":"120000"},{"provincecn":"宁夏回族自治区","provinceid":"640000"},{"provincecn":"重庆市","provinceid":"500000"},{"provincecn":"河南省","provinceid":"410000"},{"provincecn":"江西省","provinceid":"360000"},{"provincecn":"吉林省","provinceid":"220000"},{"provincecn":"内蒙古自治区","provinceid":"150000"},{"provincecn":"江苏省","provinceid":"320000"},{"provincecn":"山西省","provinceid":"140000"},{"provincecn":"云南省","provinceid":"530000"},{"provincecn":"海南省","provinceid":"460000"},{"provincecn":"西藏自治区","provinceid":"540000"},{"provincecn":"上海市","provinceid":"310000"},{"provincecn":"青海省","provinceid":"630000"},{"provincecn":"广西壮族自治区","provinceid":"450000"},{"provincecn":"湖北省","provinceid":"420000"},{"provincecn":"新疆维吾尔自治区","provinceid":"650000"},{"provincecn":"北京市","provinceid":"110000"},{"provincecn":"广东省","provinceid":"440000"},{"provincecn":"浙江省","provinceid":"330000"},{"provincecn":"陕西省","provinceid":"610000"},{"provincecn":"河北省","provinceid":"130000"},{"provincecn":"甘肃省","provinceid":"620000"},{"provincecn":"贵州省","provinceid":"520000"},{"provincecn":"山东省","provinceid":"370000"}]}},
    	qu: {"status":"success","errcode":"0000","errmsg":"成功","data":{"areas":[{"areacn":"长安区","areaid":"130102"},{"areacn":"桥东区","areaid":"130103"},{"areacn":"桥西区","areaid":"130104"},{"areacn":"新华区","areaid":"130105"},{"areacn":"井陉矿区","areaid":"130107"},{"areacn":"裕华区","areaid":"130108"},{"areacn":"井陉县","areaid":"130121"},{"areacn":"正定县","areaid":"130123"},{"areacn":"栾城县","areaid":"130124"},{"areacn":"行唐县","areaid":"130125"},{"areacn":"灵寿县","areaid":"130126"},{"areacn":"高邑县","areaid":"130127"},{"areacn":"深泽县","areaid":"130128"},{"areacn":"赞皇县","areaid":"130129"},{"areacn":"无极县","areaid":"130130"},{"areacn":"平山县","areaid":"130131"},{"areacn":"元氏县","areaid":"130132"},{"areacn":"赵　县","areaid":"130133"},{"areacn":"辛集市","areaid":"130181"},{"areacn":"藁城市","areaid":"130182"},{"areacn":"晋州市","areaid":"130183"},{"areacn":"新乐市","areaid":"130184"},{"areacn":"鹿泉市","areaid":"130185"}]}},
    	shi: {"status":"success","errcode":"0000","errmsg":"成功","data":{"citys":[{"citycn":"秦皇岛市","cityid":"130300"},{"citycn":"张家口市","cityid":"130700"},{"citycn":"承德市","cityid":"130800"},{"citycn":"邢台市","cityid":"130500"},{"citycn":"廊坊市","cityid":"131000"},{"citycn":"保定市","cityid":"130600"},{"citycn":"石家庄市","cityid":"130100"},{"citycn":"邯郸市","cityid":"130400"},{"citycn":"沧州市","cityid":"130900"},{"citycn":"唐山市","cityid":"130200"},{"citycn":"衡水市","cityid":"131100"}]}},
    	active: ['',''],
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
		if(this.data.info[0] != '') {
			this.setData({'info[0]' : app.emailTm(this.data.info[0])});
		}
		if(this.data.info[10] != '') {
			this.setData({'info[10]' : app.nameTm(this.data.info[10])});
		}
		if(this.data.info[11] != '') {
			this.setData({'info[11]' : app.bankCardTm(this.data.info[11])});
		}
		// 请求关系
		/*wx.request({
			//url: app.getBasePath() + '/json/contactRelationList.json',
			url: app.getBasePath() + 'universal/application/query/contactRelationList',
			method: 'GET',
			header: {
			  'Content-Type': 'text/html;charset=UTF-8'
			},
			success: function(res) {
				var gx = [];
				for(var i = 0; i < res.data.data.contactrelations.length; i ++) {
					gx[i] = res.data.data.contactrelations[i].contactrelationcn
				}
				$this.setData({guanxi:gx});
			}
		});*/

		// 请求省份
		for(var i = 0; i < this.data.shen.data.provinces.length; i ++) {
			plist[i] = this.data.shen.data.provinces[i].provincecn;
			plistid[i] = this.data.shen.data.provinces[i].provinceid;
		}
		$this.setData({selectName:plist,selectId:plistid});
		/*wx.request({
			url: app.getBasePath() + 'universal/application/query/provinceList',
			//url: app.getBasePath() + '/json/provinceList.json',
			method: 'GET',
			success: function(res) {
				for(var i = 0; i < res.data.data.provinces.length; i ++) {
					plist[i] = res.data.data.provinces[i].provincecn;
					plistid[i] = res.data.data.provinces[i].provinceid;
				}
				$this.setData({selectName:plist,selectId:plistid});
			}
		});*/
		app.closeLoad();
	},
	/**触发显示scroll-view**/
	showScrollView: function(e) {
		this.setData({scrollType:false,scrollTop:'0',selectName:plist,selectId:plistid,bz:e.currentTarget.dataset.index});
	},
	/**scroll-view点击事件处理**/
	scrolltap: function(e) {
		app.showLoad();
		var $this = this,
			selectIndex = this.data.selectIndex,			/**操作步骤**/
			targetId = e.currentTarget.dataset.id,			/**选中内容对应的id**/
			targetName = e.currentTarget.dataset.name,		/**选中显示内容**/
			bz = this.data.bz;								/**根据这个来区所对应的选择项**/
		this.setData({scrollTop:'0'});						/**scroll-view滚动到顶部**/
		if(selectIndex != 2){
			if(selectIndex == 0) {		/**请求市**/

				var proList = [],proidList = [];
				for(var i = 0; i < this.data.shi.data.citys.length; i ++) {
					proList[i] = this.data.shi.data.citys[i].citycn;
					proidList[i] = this.data.shi.data.citys[i].cityid;
				}
				$this.setData({scrollTop:0,selectName:proList,selectId:proidList,'targetName[0]':targetName});



			    /*wx.request({
					url: app.getBasePath() + 'universal/application/query/cityList',
					//url: app.getBasePath() + '/json/cityList.json',
					//method : 'GET',
					method: 'POST',
					data: JSON.stringify({provinceid : targetId}),
					success: function(res) {
						var proList = [],proidList = [];
						for(var i = 0; i < res.data.data.citys.length; i ++) {
							proList[i] = res.data.data.citys[i].citycn;
							proidList[i] = res.data.data.citys[i].cityid;
						}
						$this.setData({scrollTop:0,selectName:proList,selectId:proidList,'targetName[0]':targetName});
					}
				});*/
			} else {					/**请求区**/


				var cityList = [],cityidList = [];
				for(var i = 0; i < this.data.qu.data.areas.length; i ++) {
					cityList[i] = this.data.qu.data.areas[i].areacn;
					cityidList[i] = this.data.qu.data.areas[i].areaid;
				}
				$this.setData({scrollTop:'0',selectName:cityList,selectId:cityidList,'targetName[1]':targetName});


				/*wx.request({
					//url: app.getBasePath() + '/json/cityAreaList.json',
					//method : "GET",
					url: app.getBasePath() + 'universal/application/query/cityAreaList',
					method: 'POST',
					data: JSON.stringify({cityid : targetId}),
					success: function(res) {
						var cityList = [],cityidList = [];
						for(var i = 0; i < res.data.data.areas.length; i ++) {
							cityList[i] = res.data.data.areas[i].areacn;
							cityidList[i] = res.data.data.areas[i].areaid;
						}
						$this.setData({scrollTop:'0',selectName:cityList,selectId:cityidList,'targetName[1]':targetName});
					}
				});*/
			}
			selectIndex ++;
			this.setData({selectIndex:selectIndex});
		} else {
			this.setData({scrollType:true,selectIndex:0,'targetName[2]':targetName});
			if(bz == 0) {
				this.setData({jz:this.data.targetName,'active[0]':'active'})				/**设置居住城市**/
			} else {
				this.setData({dw:this.data.targetName,'active[1]':'active'})				/**设置单位城市**/
			}		
		}
		app.closeLoad();
	},
	/**picker选择处理**/
	bindPickerChange: function(e) {
		var $this = this,
			$index = Number(e.currentTarget.dataset.index),
			$select = Number(e.currentTarget.dataset.select),
			provice = '';
		switch($index){
			case 2:this.setData({'index[2]': e.detail.value});break;		/**亲属关系**/
			case 3:this.setData({'index[3]': e.detail.value});break;		/**紧急联系关系**/
		}
	},
	/**同步input输入的值**/
	changeT: function(e) {
		var $index = Number(e.currentTarget.dataset.index),
		 	$value = e.detail.value,
			$id = e.currentTarget.id;
			//this.setData({'zs[0].e.currentTarget.dataset.index' : '123'});
			//console.log(this.data.info[10]);
		switch($index){
			case 0:this.setData({'info[0]':$value});break;
			case 1:this.setData({'info[1]':$value});break;
			case 2:this.setData({'info[2]':$value});break;
			case 3:this.setData({'info[3]':$value});break;
			case 4:this.setData({'info[4]':$value});break;
			case 5:this.setData({'info[5]':$value});break;
			case 6:this.setData({'info[6]':$value});break;
			case 7:this.setData({'info[7]':$value});break;
			case 8:this.setData({'info[8]':$value});break;
			case 9:this.setData({'info[9]':$value});break;
			case 10:this.setData({'info[10]':$value});break;
			case 11:this.setData({'info[11]':$value});break;
			case 12:this.setData({'info[12]':$value});break;
		}
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
	/**提交操作**/
	submitTap: function() {
		var errShow = '';
		var $this = this;
		var $data = this.data;
		console.log(this.data.zs[0].relname);
		/**判断是否为空提示相应的内容**/
		for(var i=0;i<$data.info.length;i++){					
			if($data.info[i] == ''){
				switch(i){
					case 0:errShow = '请填写电子邮箱';break;
					case 1:errShow = '请填写详细地址';break;
					case 2:errShow = '请填写单位全称';break;
					case 3:errShow = '请填写单位详细地址';break;
					case 4:errShow = '请填写区号';break;
					case 5:errShow = '请填写固定电话';break;
					case 6:errShow = '请填写亲属联系人姓名';break;
					case 7:errShow = '请填写亲属联系人手机号码';break;
					case 8:errShow = '请填写紧急联系人姓名';break;
					case 9:errShow = '请填写紧急联系人手机号码';break;
					case 10:errShow = '请填写真实姓名';break;
					case 11:errShow = '请填写身份证号';break;
				}
				return $this.showPop(errShow);
			}
		}
		if(!ut.regIdCard($data.info[11]).check) {
			return $this.showPop("请填写正确的身份证");
		}
		if(/[\*\s]/.test($data.info[6])) {
			return $this.showPop('请填写正确的亲属联系人姓名');
		}
		if(/[\*\s]/.test($data.info[8])) {
			return $this.showPop('请填写正确的紧急联系人姓名');
		}
		if(!ut.regPhone($data.info[7])){
			return $this.showPop('亲属联系人手机号码错误');
		}
		if(!ut.regPhone($data.info[9])){
			return $this.showPop('紧急联系人手机号码错误');
		}
		if($data.active[0] == '') {
			return $this.showPop('请选择居住城市');
		}
		if($data.active[1] == '') {
			return $this.showPop('请选择单位城市');
		}
		if(!ut.regEmail($data.info[0])){
			return $this.showPop('邮箱错误');
		}
		if(!/\d{3,4}/.test($data.info[4])) {
			return $this.showPop('请填写正确的区号');
		}
		if(!/\d{7,8}/.test($data.info[5])) {
			return $this.showPop('请填写正确的固定电话');
		}
		if($data.relname == $data.info[6] || $data.relname == $data.info[8]){
			return $this.showPop('联系人不可与申请人姓名相同');
		}
		if($data.info[6] == $data.info[8]){
			return $this.showPop('亲属联系人姓名不能和紧急联系人姓名一致');
		}
		if($data.info[7] == $data.info[9]){
			return $this.showPop('亲属联系人手机号不能和紧急联系人手机号一致');
		}
		if($data.info[12] != '' && $data.info[12] != undefined) {
			if(!ut.regPhone($data.info[12])) {
				return $this.showPop('请填写正确的推荐人电话');
			}
		}
		wx.setStorageSync('relname', $data.info[10]);		/**将relname同步放入缓存中**/
		/**跳转页面**/
		wx.navigateTo({
		  url: '../bankCard/bankCard'
		})
	}
}

Page(pageObject);