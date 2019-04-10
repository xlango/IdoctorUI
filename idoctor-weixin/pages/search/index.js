// pages/search/index.js
var app = getApp()
var gburl = app.globalData.url
var WxSearch = require('search-model.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proviceList: [
      "直辖市",
      "广东省",
      "广西",
      "海南省",
      "河北省",
      "山西省",
      "内蒙古",
      "江苏省",
      "浙江省",
      "安徽省",
      "福建省",
      "江西省",
      "山东省",
      "河南省",
      "湖北省",
      "湖南省",
      "辽宁省",
      "吉林省",
      "黑龙江省",
      "陕西省",
      "甘肃省",
      "青海省",
      "宁夏",
      "新疆",
      "四川省",
      "贵州省",
      "云南省",
      "西藏",
      "香港",
      "台湾",
      "澳门"
    ],
    cityList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(that.data.cityList)
    WxSearch.init(
      that,  // 本页面一个引用
      that.data.cityList, // 热点搜索推荐，[]表示不使用
      that.data.cityList,// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },
  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数
  // 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '../index/index?searchValue=' + value
    })
  },

  // 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 跳转
    wx.redirectTo({
      url: '../index/index?searchValue=返回'
    })
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
  getCity: function (el) {
    console.log(el.target.dataset.key)
    wx.request({
      url: gburl + "addr/getCityByProvice",
      method: "POST",
      data: {
        "provice": el.target.dataset.key
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        //console.log(res.data);
        this.setData({
          cityList: res.data,
        });
        WxSearch.init(
          this,  // 本页面一个引用
          res.data, // 热点搜索推荐，[]表示不使用
          res.data,// 搜索匹配，[]表示不使用
          this.mySearchFunction, // 提供一个搜索回调函数
          this.myGobackFunction //提供一个返回回调函数
        );
      }
    });
    var that = this;
    console.log(that.data.cityList)
   
  },
  retIndex: function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})