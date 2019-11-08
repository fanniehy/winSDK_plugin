// 获取地理位置
export async function getLocation(callback) {
  return new Promise((resolve) => {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        resolve(res);
      }
    })
  })
}

// 获取网络状态
export async function getNetworkType() {
  return new Promise((resolve) => {
    wx.getNetworkType({
      success: (res) => {
        resolve(res);
      }
    })
  })
  
}

// 获取系统配置
export async function getSystemInfo() {
  return new Promise((resolve) => {
    wx.getSystemInfo({
      success: (res) => {
        resolve(res);
      }
    })
  })
}
