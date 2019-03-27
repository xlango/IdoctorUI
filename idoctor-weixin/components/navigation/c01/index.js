// components/navigation/c01/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nav:{
      type:Array,
      value: [{
        name: '挂号',
        img: '/image/guahao.png',
        link: '../order/index?id=1'
      },
      {
        name: '疾病',
        img: '/image/jibing.png',
        link: '../order/index?id=2'
      },
      {
        name: '药品',
        img: '/image/yaopin.png',
        link: '../order/index?id=3'
      },
      {
        name: '设备',
        img: '/image/shebei.png',
        link: '../order/index?id=4'
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
