Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }, {
      id: 4
    }, {
      id: 5
    }, {
      id: 6
    }, {
      id: 7
    }],
    showFilter: false
  },

  //显示筛选
  filterMoreTap: function () {
    this.setData({
      showFilter: true
    });
  },

  //关闭
  filterBackTap: function () {
    this.setData({
      showFilter: false
    });
  },

  //跳转详情页
  detailTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/index?id=' + id
    })
  },

  
  //跳转收藏
  collectTap: function(e) {
    console.log(123);
    wx.navigateTo({
      url: '../collect/index?id=1'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: options => {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: () => {
    // wx.navigateTo({
    //   url: '../order/index?id=1'
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: () => {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: () => {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: () => {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: () => {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: () => {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: () => {

  }
})