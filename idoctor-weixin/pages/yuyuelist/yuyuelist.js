// pages/hoslist/hoslist.js
var app = getApp()
var gburl = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageNum: 1,
    state:0,
    userid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        //console.log(res.data)
        that.setData({
          userid: res.data.openid,
        })
        that.getYuyueList(res.data.openid, 0)
      },
      fail(e) {
        var that = this
        wx.showModal({
          title: '提示',
          content: '您还未登录，立即前往',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../homes/selectlogin/selectlogin'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })  
      }
    })
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
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    console.log(this.data.pageNum)
    wx.request({
      url: gburl + "yuyue/getByIf",
      method: "POST",
      data: {
        "userid": "owczT5I7QQ6TmZz2DMaZYo-wVP5Y",
        "state": this.data.state
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        //console.log(res.data);
        this.setData({
          list: res.data
        });
      }
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 10000);
    console.log(this.data.list)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 请求预约列表
   */
  getYuyueList: function (userid,state) {
    wx.request({
      url: gburl + "yuyue/getByIf",
      method: "POST",
      data: {
        "userid": userid,
        "state": state
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          list: res.data
        });
      }
    });
  },

  //关闭
  hide() {
    this.setData({
      showFilter: false
    });
  },
  /*
   * 内部私有方法建议以下划线开头
   * triggerEvent 用于触发事件
   */
  _show() {
    this.setData({
      showFilter: true
    });
  },
  _hide() {
    this.hide()
  },
  _finish() {
    //触发回调
    this.triggerEvent("finish")
  }, 
  getHestory: function () {
    this.setData({
      state: 1
    });
    this.getYuyueList(this.data.userid,1)
  },
  getWait: function () {
    this.setData({
      state: 2
    });
    this.getYuyueList(this.data.userid, 2)
  },
  getCancel: function () {
    this.setData({
      state: 3
    });
    this.getYuyueList(this.data.userid, 3)
  },

  //跳转详情页
  detailTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../yuyuedetail/yuyuedetail?id=' + id + "&&openid=" + this.data.userid
    })
  },
  onBlurHosByName: function (e) {
    console.log(e.detail.value);
    this.getHosList("", "", "", e.detail.value)
  },
})