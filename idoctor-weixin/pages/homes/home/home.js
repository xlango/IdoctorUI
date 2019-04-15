var app = getApp()
var gburl = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginSH: "",
    zhuxiaoSH: "",
    _src:"",
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
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          loginSH: "none",
          zhuxiaoSH: "block",
          _src: res.data.avatarUrl,
        })
      }, fail(e) {
        console.log("未登录")
        that.setData({
          loginSH: "block",
          zhuxiaoSH: "none"
        })
      }
    })
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

  login: function (e) {
    wx.navigateTo({
      url: '../selectlogin/selectlogin'
    })
  },
  zhuxiao:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确定要注销登录吗？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'userInfo',
            success(res) {
              that.setData({
                loginSH: "block",
                zhuxiaoSH: "none",
                _src: "",
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
   
  },
  toYuyue: function (e) {
    wx.navigateTo({
      url: '../../yuyuelist/yuyuelist'
    })

  }

})