// components/login/c01/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindGetUserInfo: function (e) {
      if (e.detail.errMsg === "getUserInfo:fail auth deny") {//拒绝授权
        //TODO
      } else {
        //关闭授权按钮
        this.setData({
          canIUse: false
        });
        //登录
        wx.login({
          success: res => {
            if (res.code) {
              wx.request({
                url: 'https://weixin.cxdgtm.com/api/login/weixin',
                data: {
                  code: res.code
                },
                success: function (res) {
                  console.log(res.data)
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    },
    canIUse: function () {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) { // 已经授权
            // 获取头像昵称国家等
            // wx.getUserInfo({
            //   success: function (res) {
            //     console.log(res)
            //   }
            // })
          } else {
            //显示授权按钮
            this.setData({
              canIUse: true
            });
          }
        }
      })
    }
  }
})
