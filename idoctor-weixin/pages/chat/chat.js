const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tittle: "Let's Chat",
    syas: [{
      'robot': '我是XX，来跟我聊天吧！'

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

  },


  converSation: function (e) {
    let that = this
    console.log(e.detail.value)
    var obj = {},
      isay = e.detail.value.says,
      syas = that.data.syas,
      length = syas.length,
      key = '0d24b555912d4106a4c17bc73e5520f0' //这里填入你得到的图灵机器人的apikey

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
  }

})