Page({

  /**
   * 页面的初始数据
   */
  data: {},

  //跳转详情页
  showDetail: function(e) {
    let id = e.detail.id;
    wx.navigateTo({
      url: '../detail/index?id=' + id
    })
  },

  //隐藏筛选
  rightHide:function(){
    console.log('完成');
    this.filter.hide();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.filter = this.selectComponent("#filter");
    this.selectComponent("#login").canIUse();
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