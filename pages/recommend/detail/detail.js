// pages/recommend/detail/detail.js
const app = getApp();
const api = require('../../../common/api.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDownload: false,
    info: {},
    progress: 0,
    domain: api.ImageDomain,
    isCopy: false,
    filePath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = JSON.parse(options.info)
    info.images = this.getImages(info.preImages)
    this.setData({
      info: info
    })
  },
  getImages: function (images) {
    var pre_images = images.split(',')
    if (pre_images.length > 0) {
      return pre_images;
    } else {
      return [];
    }
  },

  bindImageTap: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var imgs = []
    this.data.info.images.forEach(element => {
      imgs.push(this.data.domain + element)
    });

    wx.previewImage({
      showmenu: true,
      current: imgs[index], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },

  bindCopyTap: function (e) {
    this.data.isCopy = true
    wx.setClipboardData({
      data: this.data.info.downloadUrl,
      success(e) {
        wx.getClipboardData({
          success: (option) => {
            console.log(option)
          },
        })
      }
    })
  },

  save() {
    var that = this
    var downloadTask = wx.downloadFile({
      url: this.data.info.downloadUrl,
      success(res) {
        console.log(res)
        let strs = that.data.info.downloadUrl.split(".")
        let suffix = strs.pop()
        let file = that.data.info.name + "." + suffix
        var savePath = wx.env.USER_DATA_PATH + "/" + file
        console.log(savePath)
        wx.getFileSystemManager().saveFile({ //下载成功后保存到本地
          tempFilePath: res.tempFilePath,
          filePath: savePath,
          success(res2) {
            that.data.filePath = res2.savedFilePath
            // that.showVideo();
            wx.openDocument({
              filePath: that.data.filePath,
              showMenu: true,
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      },
      fail(res) {
        console.log('下载失败', res)
      },
      complete: function (res) {
        console.log('下载完成')

      }
    })

    downloadTask.onProgressUpdate((res) => {
      console.log(res.progress)
      that.setData({
        isDownload: true,
        progress: res.progress
      })
      if (res.progress == 100) {
        // downloadTask.abort()

        that.setData({
          isDownload: false
        })
      }
    })
  },

  bindDownloadTap: function (e) {
    this.data.isCopy = false;
    this.save()
    this.updateDownloader()
  },

  updateDownloader() {
    var id = this.data.info.id
    util.request(api.UpdateDownloaderByInfoId, {
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