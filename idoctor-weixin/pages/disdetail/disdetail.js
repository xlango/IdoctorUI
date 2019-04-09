var app = getApp()
var gburl = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comment: [1, 2],
    id: 0,
    dis: null,
    isFold1: true,
    isFold2: true,
    isFold3: true,
    isFold4: true,
    isFold5: true,
    isFold6: true,
    isFold7: true,
    isFold8: true,
    isFold9: true,
    article_id: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      article_id: "dis"+options.id
      //id:1
    });
    this.getDisById(this.data.id)
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
   * 请求疾病信息
   */
  getDisById: function (id) {
    wx.request({
      url: gburl + "disease/getByIfLike",
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
          dis: res.data[0]
        });
      }
    });
  },
  showAll: function (e) {
    var param = e.target.dataset.param;
    this.setData({
      isFold1: param == 1 ? (!this.data.isFold1) : true,
      isFold2: param == 2 ? (!this.data.isFold2) : true,
      isFold3: param == 3 ? (!this.data.isFold3) : true,
      isFold4: param == 4 ? (!this.data.isFold4) : true,
      isFold5: param == 5 ? (!this.data.isFold5) : true,
      isFold6: param == 6 ? (!this.data.isFold6) : true,
      isFold7: param == 7 ? (!this.data.isFold7) : true,
      isFold8: param == 8 ? (!this.data.isFold8) : true,
      isFold9: param == 9 ? (!this.data.isFold9) : true,
    })
  }

})