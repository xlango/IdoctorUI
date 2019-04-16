// pages/shoucang/shoucang.js
var app = getApp()
var gburl = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    colList:[],
    hosList:[],
    docList: [],
    disList: [],
    drugList: [],
    hosShow:"block",
    docShow: "none",
    disShow: "none",
    drugShow: "none",
    openid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        //console.log(res.data)
        that.setData({
          openid: res.data.openid,
        })
        that.getHosList()
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
    var that = this
    that.getHosList()
    that.getDoctorList()
    that.getDisList()
    that.getDrugList()
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
  swichNav: function (e) {
    
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      console.log("走这里swichNav" + e.target.dataset.current)
      that.setData({
        currentTab: e.target.dataset.current
      })
      if (e.target.dataset.current==0){
        that.getHosList()
        that.setData({
          hosShow: "block",
          docShow:"none",
          disShow: "none",
          drugShow: "none",
        })
      }
      if (e.target.dataset.current == 1) {
        that.getDoctorList()
        that.setData({
          hosShow: "none",
          docShow: "block",
          disShow: "none",
          drugShow: "none",
        })
      }
      if (e.target.dataset.current == 2) {
        that.getDisList()
        that.setData({
          hosShow: "none",
          docShow: "none",
          disShow: "block",
          drugShow: "none",
        })
      }
      if (e.target.dataset.current == 3) {
        that.getDrugList()
        that.setData({
          hosShow: "none",
          docShow: "none",
          disShow: "none",
          drugShow: "block",
        })
      }
    }
  },

  /**
   * 请求医院列表
   */
  getHosList: function () {
    wx.request({
      url: gburl + "collection/hos",
      method: "POST",
      data: {
        "openid": this.data.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          hosList: res.data
        });
      }
    });
  },

  //跳转医院详情页
  detailTaphos: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../hosdetail/hosdetail?id=' + id
    })
  },

  /**
 * 请求医院列表
 */
  getDoctorList: function () {
    wx.request({
      url: gburl + "collection/doc",
      method: "POST",
      data: {
        "openid": this.data.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          docList: res.data
        });
      }
    });
  },
  //跳转医生详情页
  detailTapdoc: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../doctordetail/doctordetail?id=' + id
    })
  },

  /**
* 请求疾病列表
*/
  getDisList: function () {
    wx.request({
      url: gburl + "collection/dis",
      method: "POST",
      data: {
        "openid": this.data.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          disList: res.data
        });
      }
    });
  },
  //跳转疾病详情页
  detailTapdis: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../disdetail/disdetail?id=' + id
    })
  },



  /**
* 请求药品列表
*/
  getDrugList: function () {
    wx.request({
      url: gburl + "collection/drug",
      method: "POST",
      data: {
        "openid": this.data.openid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          drugList: res.data
        });
      }
    });
  },
  //跳转药品详情页
  detailTapdrug: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../drugdetail/drugdetail?id=' + id
    })
  },
})