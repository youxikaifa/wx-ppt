// pages/topic/category/detail/detail.js
const app = getApp();
const api = require('../../../../common/api.js')
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '详情',
    categoryId: '',
    infos: [],
    pageNo: 1,
    pageSize: 10,
    ImageDomain:api.ImageDomain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var categoryId = options.categoryId
    this.setData({
      title: options.title,
      categoryId: categoryId
    })
    this.getInfos(categoryId)
  },

  touchEnd(e) {
    this.getInfos(this.data.categoryId)
  },

  getInfos(categoryId) {
    var that = this
    util.request(api.GetInfoByCategroryId, {
      categoryId: categoryId,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
    }, 'GET').then(function (res) {
      that.data.pageNo = that.data.pageNo + 1
      if (res.code === 200) {
        console.log(res.result)
        res.result.records.forEach(function(element){
          element.pre_image = that.getFirstImage(element.preImages)
        })
        var infos_ = that.data.infos.concat(res.result.records)
        that.setData({
          infos: infos_
        })
      }
    });
  },

  getFirstImage: function (images) {
    var pre_images = images.split(',')
    if (pre_images.length > 0) {
      return this.data.ImageDomain + pre_images[0]
    } else {
      return '';
    }
  },

  bindItemTap: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    wx.navigateTo({
      url: '../../../recommend/detail/detail?info=' + JSON.stringify(this.data.infos[index]),
    })
    this.updateScans(this.data.infos[index].id)
  },
  updateScans(id) {
    util.request(api.GetInfoById, {
      id: id
    }, 'GET').then(function (res) {
      console.log(res)
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