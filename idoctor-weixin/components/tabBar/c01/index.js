// components/tabBar/c01/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tab:[
      {
        url:"/pages/index/index",
        name: "首页",
        title:"首页"
      },
      {
        url: "/pages/favorite/index",
        name: "收藏",
        title:"收藏"
      },
      {
        url: "/pages/home/index",
        name: "我的",
        title:"我的"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
