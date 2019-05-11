// pages/search/index.js
var app = getApp()
var gburl = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectZZ:null,
    jianyiKS: null,
    sessionId:"",
    zhengzhuang:"",
    sexarray: ['女', '男'],
    sex: 0,
    agearray:[],
    age:0,
    hosList: [],
    loadingHidden: true,
  },

  bindPickerChange: function (e) {
    console.log('选择性别：', e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  },
  bindAgeChange: function (e) {
    console.log('选择年龄：', e.detail.value)
    this.setData({
      age: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var agearr=[]
    for(var i=0;i<120;i++){
      agearr.push(i)
    }
    //console.log(agearr)
    that.setData({
      agearray:agearr,
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
  question: function (age, query,sessionId,sex) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var time = timestamp + 200
    console.log(timestamp + 200)
    wx.request({
      url: 'https://fz.baidu.com/diagnosis/dialog/query?id=33LZ9NR00&sourceId=1&type=&callback=baidu_aiib_callback_dz&age=' + age + '&sex=' + sex+'&ageGroup=2&ageType=5&purl=https://fz.baidu.com/preview/delivery.html&query=' + query + '&stamp=' + time + '&sessionId=' + sessionId,
      success: function (res) {
        var departmentResult = JSON.parse(res.data.replace("baidu_aiib_callback_dz(", "").replace("})", "}")).data.departmentResult;
        var symptoms = JSON.parse(res.data.replace("baidu_aiib_callback_dz(", "").replace("})", "}")).data.symptoms;
        var noneMedical = JSON.parse(res.data.replace("baidu_aiib_callback_dz(", "").replace("})", "}")).data.noneMedical;
        console.log(res.data)
        if (departmentResult!=null){
          that.setData({
            jianyiKS: departmentResult.departmentInfos,
            selectZZ: null,
          })
        }
        if (symptoms!=null){
          console.log(JSON.parse(res.data.replace("baidu_aiib_callback_dz(", "").replace("})", "}")).data.sessionId)
          that.setData({
            selectZZ: symptoms,
            sessionId: JSON.parse(res.data.replace("baidu_aiib_callback_dz(", "").replace("})", "}")).data.sessionId,
            jianyiKS:null,
          })
          
        }

        if (noneMedical != null) {
          wx.showModal({
            title: "搜索失败",
            content: noneMedical.message,
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
    })
  },


  inputZZ: function (e) {
    console.log(e.detail.value)
    this.setData({
      zhengzhuang: e.detail.value,
    })
  },
  
  searchZZ:function(){
    console.log(1)
    console.log(this.data.zhengzhuang, this.data.age, this.data.sex)
    this.question(this.data.age, this.data.zhengzhuang, "", this.data.sex);
  },

  choiseZZ:function(e){
    this.question(this.data.age, e.target.dataset.key, this.data.sessionId,this.data.sex);
  },

  tuijianHos:function(keshi){
    console.log(keshi)
    var that = this
    wx.getStorage({
      key: 'city',
      success(res) {
        console.log(res.data, keshi)
        that.getHosList(res.data, keshi)
      }
    })
  },
  /**
   * 请求医院列表
   */
  getHosList: function (addr, keshi) {
    wx.request({
      url: gburl + "hospital/getByIf",
      method: "POST",
      data: {
        "pageNum": 1,
        "pageSize": 10,
        "addr": addr,
        "keshi": keshi,
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
  //跳转详情页
  detailTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../hosdetail/hosdetail?id=' + id
    })
  },
  loadingTap: function (e) {
    this.setData({
      loadingHidden: false
    });
    var that = this;
    that.tuijianHos(e.target.dataset.key);
    setTimeout(function () {
      that.setData({
        loadingHidden: true
      }); 
    }, 20000);
  },

})