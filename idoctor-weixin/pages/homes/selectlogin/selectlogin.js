// pages/login/login.js
var app = getApp()
var gburl = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  login() {
    wx.switchTab({
      url: 'pages/homes/home/home'
    })
  },
  register() {
    wx.navigateTo({
      url: '/pages/homes/phonelogin/phonelogin'
    })
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      wx.login({
        success: function(login_res) {
          console.log(login_res)
          wx.getUserInfo({
            success: function(res) {
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
                success: function(res) {
                  const userInfo = res.data
                  // 将返回的数据保存到全局的缓冲中，方便其他页面使用
                  wx.setStorage({
                    key: 'userInfo',
                    data: userInfo
                  })
                  wx.showModal({
                    title: userInfo.nickName,
                    content: '授权登录成功',
                    showCancel: false,
                    confirmText: '确定',
                    success: function(res) {
                      // 用户没有授权成功，不需要改变 isHide 的值
                      if (res.confirm) {
                        wx.switchTab({
                          url: '/pages/homes/home/home'
                        })
                      }
                    }
                  });
                 
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
})