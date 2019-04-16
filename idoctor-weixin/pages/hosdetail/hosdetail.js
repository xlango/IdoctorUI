var app = getApp()
var gburl = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comment: [1, 2],
    id:0,
    hos:null,
    article_id: "",
    cancelCol:"none",
    addCol:"block",
    openid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      article_id: "hos"+options.id
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
    
    this.getHosById(this.data.id)
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
   * 请求医院信息
   */
  getHosById: function (id) {
    wx.request({
      url: gburl + "hospital/getByIf",
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
          hos: res.data[0]
        });
      }
    });
  },
  //跳转医生列表
  goDocList: function (e) {
    wx.navigateTo({
      url: '../doctorlist/doctorlist?name=' + this.data.hos.hosName
    })
  },

  isCol: function (id) {
    var that=this
    wx.request({
      url: gburl + "collection/isCol",
      method: "POST",
      data: {
        "cid": id,
        "type": 1,
        "openid":this.data.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        if (res.data>0){
          that.setData({
            cancelCol: "block",
            addCol: "none",
          });
        }else{
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
        "type": 1,
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
  cancelCollection: function() {
    wx.request({
      url: gburl + "collection/cancel",
      method: "POST",
      data: {
        "type": 1,
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