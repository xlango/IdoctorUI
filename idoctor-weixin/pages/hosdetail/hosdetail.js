var app = getApp()
var gburl = app.globalData.url
var QQMapWX = require('../../utils/map/qqmap-wx-jssdk.js');
var qqmapsdk;
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
    isFold1: true,
    lat:0,
    lng:0,
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
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '5HUBZ-E5FHQ-MDQ5U-GIIHX-PMY4F-IMFQG'
    });

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

  showAll: function (e) {
    var param = e.target.dataset.param;
    this.setData({
      isFold1: param == 1 ? (!this.data.isFold1) : true,
    })
  },
  locationThis: function () {
    var that=this
    // 调用接口
    qqmapsdk.search({
      keyword: that.data.hos.addr + that.data.hos.hosName,
      success: function (res) {
        console.log(res.data[0].location.lat, res.data[0].location.lng);
        // that.setData({
        //   lat: res.data[0].location.lat,
        //   lng: res.data[0].location.lng,
        // })
        that.showMap(res.data[0].location.lat, res.data[0].location.lng, that.data.hos.hosName)
      },
      fail: function (res) {
        console.log(res);
      },

    });
   
  },
  showMap: function (lat, lng, name){
    var that = this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.info(lat, lng)
        // success
        wx.openLocation({
          name:name,
          latitude: lat, // 纬度，范围为-90~90，负数表示南纬
          longitude: lng, // 经度，范围为-180~180，负数表示西经
          scale: 10, // 缩放比例
        })
      }
    })
  }
})