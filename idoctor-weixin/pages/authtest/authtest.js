var app = getApp()
var gburl = app.globalData.url
Page({
  data: {
    userInfo: null,
  },

  onLoad: function () {
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    console.info(userInfo)
    if (userInfo) {
      wx.login({
        success: function (login_res) {
          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: gburl + 'auth/login',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  "code": login_res.code,
                  "userHead": userInfo.avatarUrl,
                  "userName": userInfo.nickName,
                  "userGender": userInfo.gender,
                  "userCity": userInfo.city,
                  "userProvince": userInfo.province
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
        userInfo: userInfo
      })
    }
  }

  
  // onGotUserInfo: function (e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.userInfo)
  //   console.log(e.detail.rawData)
  //   //用户按了拒绝按钮
  //   wx.showModal({
  //     title: e.detail.userInfo.nickName,    
  //     content: '授权登录成功',
  //     showCancel: false,
  //     confirmText: '确定',
  //     success: function (res) {
  //       // 用户没有授权成功，不需要改变 isHide 的值
  //       if (res.confirm) {
  //         console.log('用户点击了“授权”');
  //       }
  //     }
  //   });

  // },
})
