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
    cancelCol: "none",
    addCol: "block",
    openid: "",

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

    var that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        //console.log(res.data)
        that.setData({
          openid: res.data.openid,
        })
        that.isCol(options.id)
      },
      fail(e) {
        var that = this
        wx.showModal({
          title: '提示',
          content: '您还未登录，立即前往',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../homes/selectlogin/selectlogin'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })

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
  },
isCol: function (id) {
    var that = this
    wx.request({
      url: gburl + "collection/isCol",
      method: "POST",
      data: {
        "cid": id,
        "type": 3,
        "openid": this.data.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        if (res.data > 0) {
          that.setData({
            cancelCol: "block",
            addCol: "none",
          });
        } else {
          that.setData({
            cancelCol: "none",
            addCol: "block",
          });
        }

      }
    });
  },

  // 添加收藏
  addCollection: function () {
    wx.request({
      url: gburl + "collection/add",
      method: "POST",
      data: {
        "type":3,
        "cid": this.data.id,
        "openid": this.data.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.isCol(this.data.id)
      }
    });
  },

  //取消收藏
  cancelCollection: function () {
    wx.request({
      url: gburl + "collection/cancel",
      method: "POST",
      data: {
        "type": 3,
        "cid": this.data.id,
        "openid": this.data.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.isCol(this.data.id)
      }
    });
  },
})