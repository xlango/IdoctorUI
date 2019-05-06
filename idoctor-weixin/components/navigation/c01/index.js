// components/navigation/c01/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nav:{
      type:Array,
      value: [{
        name: '预约',
        img: '/res/image/icon_home_4@3x.png',
        link: '/pages/hoslist/hoslist?city=成都'
      },
      {
        name: '疾病',
        img: '/res/image/icon_home_2@3x.png',
        link: '../dislist/dislist'
      },
      {
        name: '药品',
        img: '/res/image/icon_my_service@3x.png',
        link: '../druglist/druglist'
      },
      {
        name: '导诊',
        img: '/res/image/icon_home_1@3x.png',
        link: '../xialatest/xialatest'
      }]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
})
