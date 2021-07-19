// pages/topic/category/category.js
const app = getApp();
const api = require('../../../common/api.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var styleId = options.styleId
    this.getCategories(styleId)
  },

  bindCategoryTap(e) {
    var index = e.currentTarget.dataset.index
    var title = this.data.categories[index].name
    var id = this.data.categories[index].id
    wx.navigateTo({
      url: '../../topic/category/detail/detail?title='+title+'&categoryId='+id,
    })
  },

  getCategories(styleId) {
    var that = this
    util.request(api.GetCategoryByStyleId + styleId, {
      page: 1,
      pageSize: 10,
    }, 'GET').then(function (res) {
      if (res.code === 200) {
        console.log(res.result)
        that.setData({
          categories: res.result
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})