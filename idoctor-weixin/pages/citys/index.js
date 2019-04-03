// pages/citys/index.js
import {Citys} from 'citys-model.js';
var citys = new Citys(); //实例化 首页 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    citys: ['青岛','北京','深圳','杭州'],
    clickId:-1
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 用户点击Button,字体变色.
   */
  changeColor: function (res){
     this.setData({
      clickId:res.currentTarget.id
     })
  }
})