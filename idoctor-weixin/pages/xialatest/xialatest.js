// pages/accordion/accordion.js
var QQMapWX = require('../../utils/map/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    isShowFrom1: false,
    isShowFrom2: false,
    isShowFrom3: false,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 800,
    banner_url: []
  },
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '5HUBZ-E5FHQ-MDQ5U-GIIHX-PMY4F-IMFQG'
    });
  },
  onShow: function () {
    // 调用接口
    qqmapsdk.search({
      keyword: '四川省成都市武侯区佳灵路6号医院',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  showFrom(e) {
    var param = e.target.dataset.param;
    this.setData({
      isShowFrom1: param == 1 ? (!this.data.isShowFrom1) : false,
      isShowFrom2: param == 2 ? (!this.data.isShowFrom2) : false,
      isShowFrom3: param == 3 ? (!this.data.isShowFrom3) : false
    });

  },
  openMap: function () {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        wx.openLocation({
          latitude: res.latitude, // 纬度，范围为-90~90，负数表示南纬
          longitude: res.longitude, // 经度，范围为-180~180，负数表示西经
          scale: 28, // 缩放比例
        })
      }
    })
  }
})