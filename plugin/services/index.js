export async function getVideoUrl(param) {
  return new Promise((resolve) => {
    wx.request({
      url: 'http://47.113.26.63/v1/fetch',
      method: 'post',
      data: {
        requestId: param.requestId,
        slotId: param.slotId,
        packageName: param.packageName,
        appVersion: param.appVersion,
        network: param.network,
        imei: param.imei,
        imsi: param.imsi,
        realIp: param.realIp,
        lat: param.lat,
        lon: param.lon,
        locationProvider: param.locationProvider,
        osType: param.osType,
        scHeight: param.scHeight,
        scWidth: param.scWidth
      },
      success: (res) => {
        resolve(res.data);
      },
    })
  })
};

// 点击上报
export async function eventReport(url) {
  return new Promise(() => {
    wx.request({
      url,
    })
  })
}