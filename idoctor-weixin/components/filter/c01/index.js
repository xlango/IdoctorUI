// component/filter/c01/filter.js
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
    showFilter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //关闭
    hide () {
      this.setData({
        showFilter: false
      });
    },
    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    _show() {
      this.setData({
        showFilter: true
      });
    },
    _hide(){
      this.hide()
    },
    _finish() {
      //触发回调
      this.triggerEvent("finish")
    }
  }
})
