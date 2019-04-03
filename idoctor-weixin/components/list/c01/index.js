// component/filter/c01/filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[{
        id:1,
        name:'成龙哥哥',
        image:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        hot: [0, 0, 0, 0],
        location:'朝阳',
        place:'山东青岛职业学院',
        age:20,
        workAge:10,
        grade:"金牌陪护",
        sum:10,
        workRange:['医疗陪护','挂号陪诊']
        },{
          id:2,
          name: '成龙妹妹',
          image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          hot: [0,0,0,0],
          location: '朝阳',
          place: '山东青岛职业学院',
          age: 25,
          workAge: 15,
          grade: "金牌陪护",
          sum: 10,
          workRange: ['居家陪护', '挂号陪诊']
        }]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load(list){
      console.info("xxxx");
      this.setData({
        list: list
      });
    },
    _load(){
      //触发回调
      this.triggerEvent("load")
    },
    _detail(e){
      let id = e.currentTarget.dataset.id;
      //触发回调
      this.triggerEvent("detail",{id:id})
    }
  }
})