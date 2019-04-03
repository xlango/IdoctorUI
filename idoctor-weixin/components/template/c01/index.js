// components/template/c01/index.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabbarinit:function() {
    return [
      {
        "current": 0,
        "pagePath": "/pages/index/index",
        "iconPath": "/imgs/home.png",
        "selectedIconPath": "/imgs/home_on.png",
        "text": "主页"
      },
      {
        "current": 0,
        "pagePath": "/pages/news/news",
        "iconPath": "/imgs/message.png",
        "selectedIconPath": "/imgs/message_on.png",
        "text": "资讯"

      },
      {
        "current": 0,
        "pagePath": "/pages/category/category",
        "iconPath": "/imgs/category.png",
        "selectedIconPath": "/imgs/category_on.png",
        "text": "分类"
      },
      {
        "current": 0,
        "pagePath": "/pages/buy/buy",
        "iconPath": "/imgs/buy.png",
        "selectedIconPath": "/imgs/buy_on.png",
        "text": "购物"
      }
    ]
  }
  }
})
