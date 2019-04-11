// pages/hoslist/hoslist.js
var app = getApp()
var gburl = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    typeList: ["专科医院", "中医医院", "传染病医院", "儿童医院", "口腔医院", "妇幼保健医院", "心血管医院", "眼科医院", "综合医院", "肿瘤医院", "门诊医院", "骨伤医院", "骨科医院", "其他", "未知"],
    levelList: ["三级甲等", "三级乙等", "三级丙等", "二级甲等", "二级乙等", "二级丙等", "一级甲等", "一级乙等", "一级丙等", "三级特等", "三级医院", "二级医院", "一级医院", "互联网甲等", "未定级", "其他"],
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
    showFilter: false,
    isShowTop1: false,
    isShowTop2: false,
    isShowTop3: false,
    addr: "",
    type: "",
    level: "",
    provice: "",
    btnProviceColor: "",
    hosName: "",
    pageNum: 1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getYuyueList()
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
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    console.log(this.data.pageNum)
    wx.request({
      url: gburl + "hospital/getByIf",
      method: "POST",
      data: {
        "pageNum": this.data.pageNum,
        "pageSize": 5,
        "addr": this.data.addr,
        "type": this.data.type,
        "level": this.data.level,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        //console.log(res.data);
        var newlist = this.data.list.concat(res.data)
        console.log(newlist);
        this.setData({
          list: newlist
        });
      }
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 10000);
    console.log(this.data.list)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 请求预约列表
   */
  getYuyueList: function () {
    wx.request({
      url: gburl + "yuyue/getByIf",
      method: "POST",
      data: {
        "userid": "owczT5I7QQ6TmZz2DMaZYo-wVP5Y",
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
  getHosByType: function (el) {
    console.log(el.target.dataset.text);
    this.setData({
      type: el.target.dataset.text
    });
    this.getHosList(this.data.addr, this.data.type, this.data.level, "")
  },



  //跳转详情页
  detailTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../hosdetail/hosdetail?id=' + id
    })
  },
  onBlurHosByName: function (e) {
    console.log(e.detail.value);
    this.getHosList("", "", "", e.detail.value)
  },
})