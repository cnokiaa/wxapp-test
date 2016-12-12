//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  showLoad: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
  },
  closeLoad: function() {
    setTimeout(function(){
      wx.hideToast()
    },100)
  },


  /**姓名脱敏**/
  nameTm : function(name) {
    var stars = '';
    for(var i = 1; i < name.length; i++) {
      stars += '*';
    }
    return stars + name.substr(-1,1);
  },
  /**邮箱脱敏**/
  emailTm : function(mail) {
      var email = mail.split('@');
      var stars = '';
      if(email[0].length > 3) {
        for(var i = 0; i < email[0].length; i++) {
          stars += '*';
        }
      } else {
        stars = '*';
      }
      return email[0].substr(0,3) + stars + '@' + email[1];
  },
  /**银行卡脱敏**/
  bankCardTm : function(str) {
    return str.substr(0,6) + '******' + str.substr(-4,4);
  },
  /**电话脱敏**/
  telTm : function(tel) {
    return tel.substr(0,3) + '****' + tel.substr(-4,4);
  },

  
  /**配置路径,子页面调用app.getBasePath()获取**/
  getBasePath:function() {
    var basePath = 'http://406583529.appservice.open.weixin.qq.com';
    return basePath;
  }
})