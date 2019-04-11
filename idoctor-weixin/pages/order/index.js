var app = getApp()
var gburl = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'2019-04-11',
    region: ['广东省', '广州市', '海珠区'],
    docid:0,
    docname:"",
    dochos:"",
    phone:"",
    name:"", 
    userid:"",
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  //跳转详情页
  listTap: function (e) {
    wx.navigateTo({
      url: '../list/index?id=1'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      docid: options.id,
      docname: options.name,
      dochos: options.hos,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: () => {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: () => {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: () => {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: () => {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: () => {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: () => {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: () => {

  },
  addYuyue: function (name, phone, hos, docname, yuyueTime, docid, userid){
    wx.request({
      url: gburl + "yuyue/add",
      method: "POST",
      data: {
        "name": name,
        "phone": phone,
        "hos": hos,
        "docname": docname,
        "yuyueTime": yuyueTime,
        "docid": docid,
        "userid": userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        if(res.data>0){
          wx.showModal({
            title: "预约提醒",
            content: '预约成功',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
              if (res.confirm) {
                // wx.switchTab({
                //   url: '/pages/homes/home/home'
                // })
              }
            }
          });
        }
      }
    });
  },
  yuyue:function(){
    console.log(this.data.name)
    console.log(this.data.phone)
    console.log(this.data.date)
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        //console.log(res.data)
        that.addYuyue(that.data.name, that.data.phone, that.data.dochos, that.data.docname, that.data.date, that.data.docid, res.data.openid)
        console.log(res.data.openid)
        that.setData({
          userid: res.data.openid,
        })
      }
    })
    
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
})