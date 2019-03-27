/* 接口api */
var wdomain = "https://www.wzhouhui.com/dj",
  mdomain = "https://m.wzhouhui.com";

module.exports = {

  // 登录模块 login
  userInfo: wdomain + '/user/info',
  updateNickName: wdomain + '/user/updateNickname',
  sendPhoneMessage: mdomain + '/utils/sendPhoneMessage',
  sendMsg: wdomain + '/user/sendMsg',
  updatePhone: wdomain + '/user/updatePhone',
  checkPhone: wdomain + '/user/checkPhone',
  doLogin: mdomain + '/mp/doLogin',


}