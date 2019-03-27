// components/search/c01/index.js
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
    }
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
    selectCitys: function() {
      wx.navigateTo({
        url: '/pages/location/select-city/select-city'
      })
    },
    search: function() {
      wx.navigateTo({
        url: '/pages/search/index'
      })
    }
  }
})