var rs=""
// 语音转文字
var plugin = requirePlugin('WechatSI')
let manager = plugin.getRecordRecognitionManager()
// 检测是否有语音并进行识别
manager.onRecognize = function (res) {
  console.log('current result==', res.result)
  // 识别成功，停止识别
  manager.stop()
}
manager.onStart = function (res) {
  console.log('录音状态==', res.msg)
}
// 录音结束时，再次启动录音
manager.onStop = function (res) {
  console.log('record file path', res.tempFilePath)
  // 停止识别，获取最后识别的结果
  console.log('result', res.result)
  rs = res.result
}
manager.onError = function (res) {
  console.error('error msg', res.msg)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: ""
  },
  
  // 按下按钮的时候触发
  startrecorderHandel() {
    // 开始录音
    manager.start({
    });
  },
  // 松开按钮的时候触发-发送录音
  sendrecorderHandel() {
    // 结束录音
    manager.stop();
    this.setData({
      msg: rs.split("。")[0]
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.authorize({
      scope: 'record'
    })
  }
})
