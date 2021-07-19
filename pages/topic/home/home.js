const app = getApp();
const api = require('../../../common/api.js')
const util = require('../../../utils/util.js')
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    styles: [],
    elements: [{
        title: '布局',
        name: 'layout',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '背景',
        name: 'background',
        color: 'blue',
        icon: 'colorlens'
      },
      {
        title: '文本',
        name: 'text',
        color: 'purple',
        icon: 'font'
      },
      {
        title: '图标 ',
        name: 'icon',
        color: 'mauve',
        icon: 'icon'
      },
      {
        title: '按钮',
        name: 'button',
        color: 'pink',
        icon: 'btn'
      },
      {
        title: '标签',
        name: 'tag',
        color: 'brown',
        icon: 'tagfill'
      },
      {
        title: '头像',
        name: 'avatar',
        color: 'red',
        icon: 'myfill'
      },
      {
        title: '进度条',
        name: 'progress',
        color: 'orange',
        icon: 'icloading'
      },
      {
        title: '边框阴影',
        name: 'shadow',
        color: 'olive',
        icon: 'copy'
      },
      {
        title: '加载',
        name: 'loading',
        color: 'green',
        icon: 'loading2'
      },
    ],
  },
  attached() {},
  created() {},
  ready() {
    this.getStyle();
  },
  methods: {
    bindCategoryTap(e) {
      var index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '../topic/category/category?styleId=' + this.data.styles[index].id,
      })
    },
    getStyle: function () {
      var that = this
      util.request(api.GetAllStyle, {
        page: 1,
        pageSize: 10,
      }, 'GET').then(function (res) {
        if (res.code === 200) {
          console.log(res.result)
          that.setData({
            styles: res.result
          })
        }
      });
    },
  }
})