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
        udid: param.udid,
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

// 上报
export async function eventReport(url, position = {
  x1: 20,
  x2: 10,
  y1: 20,
  y2: 10,
  is_dl: new Date().getTime()
}) {
  const regArr = ['x1', 'x2', 'y1', 'y2', 'is_dl'];
  let reportUrl = url;
  regArr.forEach(item => {
    const replaceText = `${item}=\\w+`;
    reportUrl = reportUrl.replace(new RegExp(replaceText, 'g'), `${item}=${position[item]}`);
  })
  return new Promise((resolve) => {
    wx.request({
      url: reportUrl,
      success: () => {
        resolve('success');
      },
    })
  })
}