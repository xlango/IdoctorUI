// pages/doctorlist/doctorlist.js
var app = getApp()
var gburl = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    ksList: [
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
    zcList:[
      "院长",
      "医生",
      "技师",
      "护师",
      "医师",
      "科长",
      "检验师",
      "药师",
      "讲师",
      "主任",
      "其他"
    ],
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
    ks:"",
    provice: "",
    zc:"",
    btnProviceColor: "",
    hosname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)
    if (options.name != undefined){
      this.setData({
        hosname: options.name
      });
      this.getDocByHos(this.data.hosname)
    }else{
      this.setData({
        addr: ""
      });
      this.getDoctorList(this.data.addr, "", "", "")
    }
    
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
   * 请求医院列表
   */
  getDoctorList: function (addr, ks, zc, hospital) {
    wx.request({
      url: gburl + "doctor/getByIf",
      method: "POST",
      data: {
        "pageNum": 1,
        "pageSize": 5,
        "addr": addr,
        "ks": ks,
        "zc": zc,
        "hospital": hospital
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
    this.getDoctorList("", "","", this.data.hosname)
  },
  showFrom(e) {
    var param = e.target.dataset.param;
    this.setData({
      isShowTop1: param == 1 ? (!this.data.isShowTop1) : false,
      isShowTop2: param == 2 ? (!this.data.isShowTop2) : false,
      isShowTop3: param == 3 ? (!this.data.isShowTop3) : false,
    });
  },
  getDocByKs: function (el) {
    console.log(el.target.dataset.text);
    this.setData({
      ks: el.target.dataset.text
    });
    this.getDoctorList(this.data.addr, this.data.ks, this.data.zc, "")
  },
  getDocByZc: function (el) {
    console.log(el.target.dataset.text);
    this.setData({
      zc: el.target.dataset.text
    });
    this.getDoctorList(this.data.addr, this.data.ks, this.data.zc, "")
  },
  getCity: function (el) {
    wx.request({
      url: gburl + "addr/getCityByProvice",
      method: "POST",
      data: {
        "provice": el.target.dataset.text
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json', // 添加这个配置
      success: (res) => {
        console.log(res.data);
        this.setData({
          cityList: res.data,
          provice: el.target.dataset.text,
          addr: el.target.dataset.text
        });
      }
    });
  },
  selectCity: function (el) {
    console.log(el.target.dataset.text);
    this.setData({
      addr: el.target.dataset.text
    });
    this.getDoctorList(this.data.addr, this.data.ks, this.data.zc, "")
  },
   //跳转详情页
  detailTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../doctordetail/doctordetail?id=' + id
    })
  },
  //根据医院搜索医生
  onBlurDocByHos: function (e){
    console.log(e.detail.value);
    this.getDoctorList("", "", "", e.detail.value)
  },
  getDocByHos: function (hos) {
    wx.request({
      url: gburl + "doctor/getByHos",
      method: "POST",
      data: {
        "hos": hos
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
})