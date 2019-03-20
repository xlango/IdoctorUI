Page({
  data: {

  },
  // 取消搜索 返回主页面
  go: function() {
    wx.switchTab({
      url: '../index/index',
    })
  }
});