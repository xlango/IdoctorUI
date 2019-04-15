// pages/operation/index.js
var app = getApp()
var gburl = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    yuyueid:"",
    yuyue:null,
    doc:null,
    stateclass:"",
    show0: "none",
    show1:"none",
    show2: "none",
    show3: "none",
    show4: "none",
    show5: "none",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      openid: options.openid,
      yuyueid: options.id,
    })
    this.getYuyueList(options.openid, options.id);
    //this.getYuyueList("owczT5I7QQ6TmZz2DMaZYo-wVP5Y", 1);
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
   * 请求预约列表
   */
  getYuyueList: function (userid,id) {
    wx.request({
      url: gburl + "yuyue/getByIf",
      method: "POST",
      data: {
        "userid": userid,
        "id":id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          yuyue: res.data[0],
        });
        this.getDocById(res.data[0].docid);
        var state ="circle1";
        if (res.data[0].state==1){
          this.setData({
            show1: "block",
            show2: "none",
            show3: "none",
            show4: "none",
            show5: "block",
          });
        }
        if (res.data[0].state ==2) {
          this.setData({
            show1: "block",
            show2: "block",
            show3: "block",
            show4: "block",
            show5: "none",
          });
        }
        if (res.data[0].state == 3) {
          this.setData({
            show0: "block",
            show1: "none",
            show2: "none",
            show3: "none",
            show4: "none",
            show5: "none",
          });
        }
      }
    });
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

  /**
  * 取消预约
  */
  cancelYuyue: function (id) {
    wx.request({
      url: gburl + "yuyue/cancel",
      method: "POST",
      data: {
        "id": id,
        "state":3,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {

      }
    });
  },
  cancel:function(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确定要取消预约吗？取消后将无法恢复！',
      success: function (res) {
        if (res.confirm) {
          that.cancelYuyue(that.data.yuyue.id)
          that.getYuyueList(that.data.openid, that.data.yuyue.id);
          that.getYuyueList(that.data.openid, that.data.yuyue.id);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },


  toDocDetail:function(){
    wx.navigateTo({
      url: '../doctordetail/doctordetail?id=' + this.data.doc.id
    })
  },
})