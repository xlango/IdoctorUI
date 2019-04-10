var app = getApp()
var gburl = app.globalData.url
var QQMapWX = require('../../utils/map/qqmap-wx-jssdk.js') //引入获得地址的js文件
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
    pageNum: 1,
    loccity: "",
    district: "定位",
    placeholder: '您可输入关键字搜索医护人员',
    latitude: "",
    longitude: ""
  },

  //跳转详情页
  showDetail: function(e) {
    let id = e.detail.id;
    wx.navigateTo({
      url: '../detail/index?id=' + id
    })
  },

  //隐藏筛选
  rightHide: function() {
    console.log('完成');
    this.filter.hide();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getStorage({
      key: 'city',
      success(res) {
        console.log(res.data)
        that.setData({
          district: res.data,
          addr: res.data
        })
      },
      fail(e) {
        console.log("开始定位")
        that.getLocation();
      }
    })

    this.getHosList(this.data.addr, "", "", "")

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.filter = this.selectComponent("#filter");
    this.selectComponent("#login").canIUse();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'city',
      success(res) {
        console.log(res.data)
        that.setData({
          district: res.data,
          addr: res.data
        })
      }
    })

    this.getHosList(this.data.addr, "", "", "")

  },
  reloc: function(loc) {
    this.setData({
      district: loc
    })
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
  onReachBottom: () => {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: () => {

  },
  /**
   * 请求医院列表
   */
  getHosList: function(addr, type, level, hosName) {
    wx.request({
      url: gburl + "hospital/getByIf",
      method: "POST",
      data: {
        "pageNum": 1,
        "pageSize": 5,
        "addr": addr,
        "type": type,
        "level": level,
        "hosName": hosName,
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
  getHosByType: function(el) {
    console.log(el.target.dataset.text);
    this.setData({
      type: el.target.dataset.text
    });
    this.getHosList(this.data.addr, this.data.type, this.data.level, "")
  },
  getHosByLevel: function(el) {
    console.log(el.target.dataset.text);
    this.setData({
      level: el.target.dataset.text
    });
    this.getHosList(this.data.addr, this.data.type, this.data.level, "")
  },
  getCity: function(el) {
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
  selectCity: function(el) {
    console.log(el.target.dataset.text);
    this.setData({
      addr: el.target.dataset.text
    });
    this.getHosList(this.data.addr, this.data.type, this.data.level, "")
  },
  //跳转详情页
  detailTap: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../hosdetail/hosdetail?id=' + id
    })
  },
  onBlurHosByName: function(e) {
    console.log(e.detail.value);
    this.getHosList("", "", "", e.detail.value)
  },
  selectCitys: function() {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  search: function() {
    wx.navigateTo({
      url: '/pages/hoslist/hoslist'
    })
  },
  getLocation: function() {
    console.log(2);
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        console.log(that.data.latitude + "   " + that.data.longitude);
        //地址解析
        var demo = new QQMapWX({
          key: '5HUBZ-E5FHQ-MDQ5U-GIIHX-PMY4F-IMFQG' // 这个KEY的获取方式在上面链接 腾讯位置服务的开发文档中有详细的申请密钥步骤
        });

        demo.reverseGeocoder({ //地址解析
          location: {
            latitude: that.data.latitude,
            longitude: that.data.longitude
          },
          success: function(res) {
            console.log(res);
            //获得地址
            that.setData({
              district: res.result.address_component.city
            })
            wx.setStorage({
              key: 'city',
              data: that.data.district
            })
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {
            console.log(res);
          }
        });
      }
    })
  }
})