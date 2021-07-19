const app = getApp();
const api = require('../../../common/api.js')
const util = require('../../../utils/util.js')
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    CustomBar: app.globalData.CustomBar,
    loadProgress: 0,
    infos: [],
    pageNo: 1,
    pageSize: 10,
    inputValue: '',
    isSearch: false
  },
  attached() {},
  created() {},
  ready() {
    this.getHottest();
  },

  methods: {
    bindItemTap: function (e) {
      var index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '../recommend/detail/detail?info=' + JSON.stringify(this.data.infos[index]),
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

    bindSearchInput(e) {
      this.data.inputValue = e.detail.value
      console.log(e.detail.value)
    },

    bindConfirm(e){
      this.data.isSearch = true
      var that = this
      this.data.infos = []
      this.setData({
        loadProgress: this.data.loadProgress + 3
      })
      var setInter = setInterval(
        function () {
          console.log('setInterval==');
          if (that.data.loadProgress < 100) {
            that.setData({
              loadProgress: that.data.loadProgress + 3
            })
          } else {
            clearInterval(setInter)
            that.setData({
              loadProgress: 0
            })
          }
        }, 100)

      this.getSearch()
    },
    bindSearchTap: function (e) {

      if (this.data.inputValue.length > 0) {
        this.data.isSearch = true
        var that = this
        this.data.infos = []
        this.setData({
          loadProgress: this.data.loadProgress + 3
        })
        var setInter = setInterval(
          function () {
            console.log('setInterval==');
            if (that.data.loadProgress < 100) {
              that.setData({
                loadProgress: that.data.loadProgress + 3
              })
            } else {
              clearInterval(setInter)
              that.setData({
                loadProgress: 0
              })
            }
          }, 100)

        this.getSearch()
      } else {
        wx.showToast({
          title: '请输入搜索词',
          icon: 'none'
        })
      }

    },

    touchEnd(e) {
      if(this.data.isSearch){
        this.getSearch()
      }
    },
    getSearch() {
      var that = this
      util.request(api.GetInfoByName, {
        key: this.data.inputValue,
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize,
      }, 'GET').then(function (res) {
        that.data.pageNo = that.data.pageNo + 1
        if (res.code === 200) {
          res.result.records.forEach(element => {
            element.pre_image = that.getFirstImage(element.preImages);
          })
          var infos_ = that.data.infos.concat(res.result.records)
          that.setData({
            infos: infos_
          })
        }
      });
    },

    getHottest: function () {
      var that = this
      util.request(api.GetHottestInfo, {
        pageNo: 1,
        pageSize: 10,
      }, 'GET').then(function (res) {
        if (res.code === 200) {
          var infos_ = res.result.records
          infos_.forEach(element => {
            element.pre_image = that.getFirstImage(element.preImages);
          })
          that.setData({
            infos: infos_
          })

        }
      });
    },

    getFirstImage: function (images) {
      var pre_images = images.split(',')
      if (pre_images.length > 0) {
        return api.ImageDomain + pre_images[0]
      } else {
        return '';
      }
    }
  }

})