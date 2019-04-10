// components/search/c01/index.js
var QQMapWX = require('../../../utils/map/qqmap-wx-jssdk.js') //引入获得地址的js文件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    district: {
      type: String,
      value: '北京'
    },
    placeholder: {
      type: String,
      value: '您可输入关键字搜索医护人员'
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    latitude: "",
    longitude: ""
  },
  created() {
    var that = this
    wx.getStorage({
      key: 'city',
      success(res) {
        console.log(res.data)
        if (res.data == null) {
          console.log("开始定位")
          this.getLocation();
        } else {
          that.setData({
            district: res.data
          })
        }
      }
    })

  },
  // ready(){
  //   console.log("2222222222222222222")
  //   var that = this
    // wx.getStorage({
    //   key: 'city',
    //   success(res) {
    //     console.log(res.data)
    //       that.setData({
    //         district: res.data
    //       })

    //   }
    //  })
  // },
  /**
   * 组件的方法列表
   */
  methods: {
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
  }
})