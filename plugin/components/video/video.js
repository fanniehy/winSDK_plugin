import {
  getLocation,
  getNetworkType,
  getSystemInfo,
} from '../../tools/index.js';

import {
  getNewworType,
} from '../../tools/utils.js';

import {
  getVideoUrl,
  eventReport,
} from '../../services/index.js';

Component({
  data: {
    list: [],
    // videoUrl: 'http://ali.cdn.pys5.com/fileTourl/5d40016f.mp4',
    // title: '2019最火清理工具，让你的手机和新的一样',
  },
  lifetimes: {
    created: function () {
      wx.showLoading({
        title: '加载中',
        mask: true,
      });
    },
    attached: function () {
      Promise.all([getLocation(), getNetworkType(), getSystemInfo()]).then((results) => {
        console.log(results);
        // 地理位置
        const {
          latitude: lat,
          longitude: lon
        } = results[0];
        // 网络信息
        const { networkType } = results[1];
        // 系统信息
        const {
          brand,
          model,
          screenWidth,
          screenHeight,
          platform
        } = results[2];
        getVideoUrl({
          requestId: 'Fqe78eef',
          slotId: 'test-001',
          packageName: 'winApp',
          appVersion: '1.2.5',
          network: getNewworType(networkType),
          imei: '866375043630895',
          imsi: '1254678',
          realIp: '223.45.12.1',
          lat,
          lon,
          locationProvider: 0,
          wifi: '00:0c:29:99:02:cd',
          osType: 1,
          scHeight: screenHeight,
          scWidth: screenWidth,
        }).then((res) => {
          console.log(res);
          const { data, code } = res;
          this.setData({
            ...data,
          }, () => {
            wx.hideLoading();
          })
        });
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    // 视频被点击
    adClick: function (e) {
      const { tracks: { AD_CLICK: { urls = [] } } } = this.data;
      const clickReport = urls.map(item => eventReport(item));
      // 点击上报
      Promise.all(clickReport);
    },
    // 进度条在变化
    progressupdate: function (event) {
      if(event.timeStamp < 2000) {
        console.log(event);
      }
    },
  }
})