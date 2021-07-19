var API_BASE_URL = 'https://ppt-api.lhqabc.xyz/ppt/';
var IMAGE_DOMAIN = 'https://zx-ppt.oss-cn-beijing.aliyuncs.com'

module.exports = {
  ImageDomain:IMAGE_DOMAIN,
  GetHottestInfo: API_BASE_URL + 'info/queryHottestInfo', // 根据code获取openId
  GetAllStyle: API_BASE_URL + 'style/queryAllStyle',
  GetInfoByCategroryId: API_BASE_URL + 'info/queryByCategoryId',
  GetInfoById: API_BASE_URL + 'info/queryById',
  GetInfoByName: API_BASE_URL + 'info/queryByName/',
  GetCategoryByStyleId: API_BASE_URL + 'category/queryByStyle/',
  UpdateDownloaderByInfoId:API_BASE_URL + 'info/updateDownloader', //更新下载次数
};