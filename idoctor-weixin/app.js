App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  globalData: {
    userInfo: undefined,
    latitude: undefined,
    longitude: undefined,
    windowWidth: undefined,
    windowHeight: undefined,
    locs: undefined,
    currentLoc: undefined,
    city: undefined,
    reflesh: false,
    locId: undefined,
    eventCategory: undefined,
    doubanBase: "https://douban.uieee.com",
    loc_list_url: "/v2/loc/list",
    loc_url: "/v2/loc/",
    event_list_url: "/v2/event/list",
    event_url: "/v2/event/"
  },
  onLaunch: function() {
    // 登录发送给后端session
    // wx.login({
    //   success: res => {
    //     if (res.code) {
    //       wx.request({
    //         url: 'https://weixin.cxdgtm.com/api/login/weixin',
    //         data: {
    //           code: res.code
    //         },
    //         success: function (res) {
    //           console.log(res.data)
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })

    // wx.getUserInfo({
    //   success: res => {
    //     // 可以将 res 发送给后台解码出 unionId
    //     //this.globalData.userInfo = res.userInfo
    //   }
    // })

    // Do something initial when launch.
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      }
    });
  },


  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },
    getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  },
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.globalData.latitude = res.latitude;
        that.globalData.longitude = res.longitude;
      }
    })
  },

  /**
   * 全局变量
   */
  // globalData: {
  //   userInfo: null
  // }

})