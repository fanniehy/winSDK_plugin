// plugin/components/win-streamerscreen/win-streamerscreen.js
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
  /**
   * 组件的属性列表
   */
  properties: {
    openId: String,
    slotId: String,
    packageName: String,
    appVersion: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    streamerToFull: false,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2500,
    duration: 1000,
    text: '小巧清理工具，加快你的手机运营速度，让你的手机快而不卡',
    title: '2019最火清理工具，让你的手机和新的一样',
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    created: function () {
      this.videoContext = wx.createVideoContext('myVideo');
      wx.showLoading({
        title: '加载中',
        mask: false,
      });
    },
    attached: function () {
      Promise.all([getLocation(), getNetworkType(), getSystemInfo()]).then((results) => {
        // 地理位置
        const {
          latitude: lat,
          longitude: lon
        } = results[0];
        // 网络信息
        const {
          networkType
        } = results[1];
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
          const {
            data,
            code
          } = res;
          wx.setStorage({
            key: "win_adInfo",
            data: JSON.stringify(data),
          })
          this.setData({
            ...data,
          }, () => {
            wx.hideLoading();
            const {
              tracks: {
                AD_SHOW: {
                  urls = []
                },
              }
            } = this.data;
            // 视频广告被展示时上报
            const adShowReport = urls.map(item => eventReport(item));
            // playReport 是当前进度为0时的上报
            Promise.all([...adShowReport]).then((result) => {
              // console.log(result);
            });
          })
        });
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    winStreamerScreen: function (res) {
      console.log(res);
    },
    changeIndicatorDots: function () {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    adsTap: function () {
      this.setData({
        streamerToFull: true
      });
    },
    changeAutoplay: function () {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },

    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },

    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    }
  }
})
