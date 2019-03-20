var WxAutoImage = require('../../js/wxAutoImageCal.js');
var app = getApp();

Page({
  data: {
    iconArray: [{
        "iconUrl": '../../image/icon-qiandao.png',
        "iconText": '签到'
      },
      {
        "iconUrl": '../../image/icon-fujin.png',
        "iconText": '附近'
      },
      {
        "iconUrl": '../../image/icon-zhanhui.png',
        "iconText": '游展'
      },
      {
        "iconUrl": '../../image/icon-fuli.png',
        "iconText": '福利'
      },
      {
        "iconUrl": '../../image/icon-muma.png',
        "iconText": '玩乐'
      },
      {
        "iconUrl": '../../image/icon-xingxing.png',
        "iconText": '周边'
      },
      {
        "iconUrl": '../../image/icon-tiyu.png',
        "iconText": '体育'
      },
      {
        "iconUrl": '../../image/icon-qinzi.png',
        "iconText": '亲子'
      },
    ],
  },
  // 跳转到搜索页面
  search: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  cusImageLoad: function(e) {
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
  }
})