// pages/hoslist/hoslist.js
var app = getApp()
var gburl = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    showFilter: false,
    isShowTop1: false,
    isShowTop2: false,
    isShowTop3: false,
    bodyList: [
      "头部",
      "颈部",
      "四肢",
      "胸部",
      "背部",
      "腹部",
      "腰部",
      "盆腔",
      "臀部",
      "生殖部位",
      "皮肤",
      "全身"
    ],
    body:"",
    keshiList: [
      "内科",
      "外科",
      "妇产科",
      "男科",
      "生殖健康",
      "儿科",
      "五官科",
      "肿瘤科",
      "皮肤性病科",
      "精神心理科",
      "感染科",
      "老年病科",
      "肝病科",
      "急诊科",
      "中医科",
      "体检保健科",
      "职业病科",
      "营养科",
      "传染科",
      "整形美容科",
      "其他"
    ],
    keshi:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDisList("","","")
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
   * 请求疾病列表
   */
  getDisList: function (name, buwei, keshi){
    wx.request({
      url: gburl +"disease/getByIfLike",
      method: "POST",
      data: {
        "pageNum": 1,
        "pageSize": 5,
        "buwei":buwei,
        "keshi":keshi,
        "name":name
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          list: res.data
        });
      }
    });
  },
  
  //关闭
  hide() {
    this.setData({
      showFilter: false
    });
  },
  /*
   * 内部私有方法建议以下划线开头
   * triggerEvent 用于触发事件
   */
  _show() {
    this.setData({
      showFilter: true
    });
  },
  _hide() {
    this.hide()
  },
  _finish() {
    //触发回调
    this.triggerEvent("finish")
  },
  showFrom(e) {
    var param = e.target.dataset.param;
    this.setData({
      isShowTop1: param == 1 ? (!this.data.isShowTop1) : false,
      isShowTop2: param == 2 ? (!this.data.isShowTop2) : false,
      isShowTop3: param == 3 ? (!this.data.isShowTop3) : false,
    });
  },
  getDisByBody: function(el){
    console.log(el.target.dataset.text);
    this.setData({
      body: el.target.dataset.text
    });
    this.getDisList("", this.data.body, this.data.keshi)
  }
  ,
  getDisByKeshi: function (el) {
    console.log(el.target.dataset.text);
    this.setData({
      keshi: el.target.dataset.text
    });
    this.getDisList("", this.data.body, this.data.keshi)
  },
  //跳转详情页
  detailTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../disdetail/disdetail?id=' + id
    })
  },
  onBlurDisByName: function (e) {
    console.log(e.detail.value);
    this.getDisList(e.detail.value,"", "")
  },
})