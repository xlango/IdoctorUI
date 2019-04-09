App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
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
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },
  
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      wx.login({
        success: function (login_res) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: config.api_base_url + 'me/login',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  code: login_res.code,
                  userHead: userInfo.avatarUrl,
                  userName: userInfo.nickName,
                  userGender: userInfo.gender,
                  userCity: userInfo.city,
                  userProvince: userInfo.province
                },
                success: function (res) {
                  const userInfo = res.data.object
                  // 将返回的数据保存到全局的缓冲中，方便其他页面使用
                  wx.setStorage({ key: 'userInfo', data: userInfo })
                }
              })
            }
          })
        }
      })
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  /**
   * 全局变量
   */
  globalData: {
    url: "https://39.108.147.36/"
  }
})