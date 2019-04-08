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
    jboneList: [
      "五官用药",
      "儿科用药",
      "内分泌失常",
      "呼吸系统类",
      "妇科用药",
      "家庭常备",
      "心脑血管",
      "感冒发热",
      "男科用药",
      "皮肤用药",
      "维生素及营养类",
      "肝胆胰用药",
      "肠胃用药",
      "肾病",
      "肿瘤科"
    ],
    yibaoList: ["医保甲类", "医保乙类", "限工伤保险","非医保"],
    changuoList: ["国产", "进口","外用药"],
    zhognxiList: ["中成药","西药"],
    chufangList: ["OTC非处方药物（甲类）","OTC非处方药物（乙类）"],
    name:"",
    chufang:"", 
    zhongxi: "", 
    yibao: "", 
    changuo: "", 
    jb: "",
    jbtwoList:"",
    pageNum:1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDrugList("", "", "", "", "", "")
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
      url: gburl + "drug/getByIf",
      method: "POST",
      data: {
        "pageNum": this.data.pageNum,
        "pageSize": 5,
        "chufang": this.data.chufang,
        "zhongxi": this.data.zhongxi,
        "jb": this.data.jb,
        "yibao": this.data.yibao,
        "changuo": this.data.changuo,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        var newlist = this.data.list.concat(res.data)
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
    }, 1500);
    console.log(this.data.list)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 请求药品列表
   */
  getDrugList: function (name, chufang, zhongxi,yibao,changuo,jb) {
    wx.request({
      url: gburl + "drug/getByIf",
      method: "POST",
      data: {
        "pageNum": 1,
        "pageSize": 5,
        "chufang": chufang,
        "zhongxi": zhongxi,
        "jb": jb,
        "yibao": yibao,
        "changuo": changuo,
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
  getDrugByJb: function (el) {
    console.log(el.target.dataset.text);
    wx.request({
      url: gburl + "drug/getDrugTwoByOne",
      method: "POST",
      data: {
        "one": el.target.dataset.text
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          jbtwoList: res.data
        });
      }
    });
  }
  ,
  getDrugByJbTwo: function (el) {
    console.log(el.target.dataset.text);
    this.setData({
      jb: el.target.dataset.text
    });
    this.getDrugList("", this.data.chufang, this.data.zhongxi, this.data.yibao, this.data.changuo,this.data.jb)
  },
  getDrugByYibao: function (el) {
    console.log(el.target.dataset.text);
    this.setData({
      yibao: el.target.dataset.text
    });
    this.getDrugList("", this.data.chufang, this.data.zhongxi, this.data.yibao, this.data.changuo, this.data.jb)
  },
  getDrugByChanguo:function(el) {
    console.log(el.target.dataset.text);
    this.setData({
      changuo: el.target.dataset.text
    });
    this.getDrugList("", this.data.chufang, this.data.zhongxi, this.data.yibao, this.data.changuo, this.data.jb)
  },
  getDrugByZhongxi: function (el) {
    console.log(el.target.dataset.text);
    this.setData({
      zhongxi: el.target.dataset.text
    });
    this.getDrugList("", this.data.chufang, this.data.zhongxi, this.data.yibao, this.data.changuo, this.data.jb)
  },
  getDrugByChufang: function (el) {
    console.log(el.target.dataset.text);
    this.setData({
      chufang: el.target.dataset.text
    });
    this.getDrugList("", this.data.chufang, this.data.zhongxi, this.data.yibao, this.data.changuo, this.data.jb)
  },
  //跳转详情页
  detailTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../drugdetail/drugdetail?id=' + id
    })
  },
  onBlurDrugByName: function (e) {
    console.log(e.detail.value);
    this.getDrugList(e.detail.value, "", "", "", "", "")
  },
})