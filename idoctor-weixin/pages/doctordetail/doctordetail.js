var app = getApp()
var gburl = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comment: [1, 2],
    id: 0,
    doc: null,
    article_id: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      article_id: "doc" + options.id
      //id:1
    });
    this.getDocById(this.data.id)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 请求医生信息
   */
  getDocById: function (id) {
    wx.request({
      url: gburl + "doctor/getByIf",
      method: "POST",
      data: {
        "id": id,
        "pageNum": 1,
        "pageSize": 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          doc: res.data[0]
        });
      }
    });
  },
  //跳转回订单
  orderTap: function (e) {
    wx.navigateTo({
      url: '../order/index?id=' + this.data.id + "&name=" + this.data.doc.name + "&hos=" + this.data.doc.hospital
    })
  },

  //跳转空闲日历
  freeTime: function (e) {
    wx.navigateTo({
      url: '../calendar/index?id=1'
    })
  },

})