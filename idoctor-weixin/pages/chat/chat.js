const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tittle: "AI聊天助手",
    syas: [{
      'robot': '我是AI，来跟我聊天吧！'

    }],
    headLeft: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4139308026,2925331886&fm=26&gp=0.jpg',
    headRight: '',
    sendInfo: '',
    userMessage: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    wx.getUserInfo({
      success: function (e) {
        let header = e.userInfo.avatarUrl
        that.setData({
          headRight: header
        })
      }
    })
    var timestamp = Date.parse(new Date());
    console.log(timestamp+200)
    this.query(timestamp + 200,6,"肚子疼");
  },


  converSation: function (e) {
    let that = this
    console.log(e.detail.value)
    var obj = {},
      isay = e.detail.value.says,
      syas = that.data.syas,
      length = syas.length,
      key = 'f4d8fb8fa94646639aed073cb43edf9c' //这里填入你得到的图灵机器人的apikey

    console.log(length)
    wx.request({
      url: 'http://www.tuling123.com/openapi/api?key=' + key + '&info=' + isay,
      success: function (res) {
        let tuling = res.data.text;
        obj.robot = tuling;
        obj.isay = isay;
        syas[length] = obj;
        that.setData({
          syas: syas
        })
      }
    })


  },
  

  delectChat: function () {
    let that = this
    that.setData({
      syas: []
    })
  },
  query: function (time, age, query){
    wx.request({
      url: 'https://fz.baidu.com/diagnosis/dialog/query?id=33LZ9NR00&sourceId=1&type=&callback=baidu_aiib_callback_dz&age='+age+'&sex=0&ageGroup=2&ageType=5&purl=https://fz.baidu.com/preview/delivery.html&query='+query+'&stamp=' + time+'&sessionId=',
      success: function (res) {
        console.log(res.data)
      }
    })
  }

})