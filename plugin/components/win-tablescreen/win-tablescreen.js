// plugin/components/win-tablescreen/win-tablescreen.js
import {
  getLocation,
  getNetworkType,
  getSystemInfo,
} from '../../tools/index.js';

import {
  getNewworType,
  getOSType,
} from '../../tools/utils.js';

import {
  getVideoUrl,
  eventReport,
} from '../../services/index.js';

Component({
  properties: {
    packageName: String,
    appVersion: String,
    slotId: String,
    openId: String, //充当udid的角色
  },
  data: {
    list: [],
    isShow: false, //是否显示广告
    // videoUrl: 'http://ali.cdn.pys5.com/fileTourl/5d40016f.mp4',
    // endAction: 'http://tang123.oss-cn-shanghai.aliyuncs.com/fileTourl/5b334dc2.jpg',
    // title: '2019最火清理工具，让你的手机和新的一样',
    // text: '小巧清理工具，加快你的手机运营速度，让你的手机快而不卡',
  },
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
        const {
          packageName,
          appVersion,
          slotId,
          openId,
        } = this.data;
        console.log(this.data.openId);
        getVideoUrl({
          packageName: packageName || 'winapp',
          appVersion: appVersion || '2.3.1',
          slotId: slotId || 'test-001',
          udid: openId || '866375043630895',
          requestId: 'Fqe78eef', // 请求id标识一个唯一请求
          network: getNewworType(networkType),
          lat,
          lon,
          locationProvider: 0, // 默认为网络定位
          osType: getOSType(platform),
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
                VD_PROGRESS = []
              }
            } = this.data;
            // 视频广告被展示时上报
            const adShowReport = urls.map(item => eventReport(item));
            const playpointTime = VD_PROGRESS.findIndex(item => item.checkPoint === 0);
            // playReport 是当前进度为0时的上报
            const playReport = playpointTime !== -1 ? VD_PROGRESS[playpointTime].urls.map(item => eventReport(item)) : [];
            Promise.all([...adShowReport, ...playReport]).then((result) => {
              // console.log(result);
            });
          })
        });
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      const {
        tracks: {
          VD_CLOSE: {
            urls = []
          }
        }
      } = this.data;
      const clickReport = urls.map(item => eventReport(item));
      // 退出视频播放上报
      Promise.all(clickReport).then((response) => {
        console.log(response);
      });
    },
  },
  methods: {
    // 广告关闭
    closeAd: function (e) {
      console.log('图片关闭');
      this.setData({
        ...e.detail,
        videoClose: true,
      });
      this.triggerEvent('closeAd');
    },
    // 广告被点击
    adClick: function (e) {
      console.log('广告被点击', e);
      const {
        detail: {
          position = {}
        }
      } = e;
      const {
        tracks: {
          AD_CLICK: {
            urls = []
          }
        }
      } = this.data;
      const clickReport = urls.map(item => eventReport(item, {
        x1: position.x,
        x2: position.y,
        y1: position.x,
        y2: position.y,
        is_dl: new Date().getTime()
      }));
      // 点击上报
      Promise.all(clickReport).then((results) => {
        console.log(results);
      });
    },
    // 视频暂停
    vdPause: function (e) {
      console.log('视频暂停', e);
      // 视频暂停
      this.setData({
        isShow: true
      });
      const {
        tracks: {
          VD_PAUSE: {
            urls = []
          }
        }
      } = this.data;
      const clickReport = urls.map(item => eventReport(item));
      // 视频暂停上报
      Promise.all(clickReport);
    },
    // 视频播放
    vdResume: function (e) {
      console.log('视频播放', e);
      const {
        tracks: {
          VD_RESUME: {
            urls = []
          },
          VD_PROGRESS = []
        }
      } = this.data;
      // adResumeReport是视频播放时候的上报
      const adResumeReport = urls.map(item => eventReport(item));
      Promise.all(adResumeReport);
    },
    // 视频播放结束
    vdEnded: function (e) {
      // 视频播放结束展示广告
      this.setData({
        isShow: true
      });
      const {
        tracks: {
          VD_PROGRESS = []
        }
      } = this.data;
      const endpointTime = VD_PROGRESS.findIndex(item => item.checkPoint === 100);
      const endedReport = VD_PROGRESS[endpointTime].urls.map(item => eventReport(item));
      Promise.all(endedReport);
    },
    // 进度条在变化
    progressupdate: function (event) {
      const {
        detail: {
          currentTime,
          duration
        }
      } = event;
      const {
        tracks: {
          VD_PROGRESS = []
        }
      } = this.data;
      // 过滤掉 progress为0和100的进度
      const progressReportPointFilter = VD_PROGRESS.filter(item => item.checkPoint !== 0 && item.checkPoint !== 100);
      const progressRate = ((currentTime / duration).toFixed(3)) * 1000;
      const progressReportPoint = progressReportPointFilter.find((item) => ((Math.abs(progressRate - (item.checkPoint) * 10)) / 1000) < 0.008);
      if (progressReportPoint) {
        console.log(progressReportPoint);
        const {
          urls = []
        } = progressReportPoint;
        // progressReport是视频播放时候的上报
        const progressReport = urls.map(item => eventReport(item));
        Promise.all(progressReport);
      }
    },
  }
})
