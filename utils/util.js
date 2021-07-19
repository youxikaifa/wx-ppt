const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}





/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "POST", header = "application/json") {
  
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': header,
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.code == 401) {
            wx.navigateTo({
              url: '/pages/auth/tokenExpired/tokenExpired',
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.data);
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}

/**
 * 封封微信的的request
 */
function requestBuffer(url, data = {}, method = "POST", header = "application/json") {
  wx.showLoading({
    title: '加载中...',
  });
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      responseType: 'arraybuffer',
      header: {
        'Content-Type': header,
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
          if (res.data.code == 401) {
            wx.navigateTo({
              url: '/pages/auth/tokenExpired/tokenExpired',
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.data);
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}

module.exports = {
  formatTime: formatTime,
  request,
  requestBuffer,
}