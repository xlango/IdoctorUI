// pages/test/test.js
var baseUrl='http://z.cn/api/v1';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 获取接口信息
   */
  getToken:function(){
   //调用登录接口
   wx.login({
     success:function(res){
       console.log('code');
       var code = res.code;
       console.log(code);
     
      wx.request({
        url: baseUrl +'/token/user?XDEBUG_SESSION_START=18540',
        data:{
          code:code
        },
        method:'POST',
        success:function(res){
          console.log(res.data);
          wx.setStorageSync('toKen', res.data.token);
        },
        fail:function(res){
          console.log(res.data);
        }
      })
     }
   })
  },
  //检查登录状态
  checkSession:function(){
     wx.checkSession({
       success:function(){
         console.log('session success');
       },
       fail:function(){
         console.log('session fail');
       }
     })
  }
})