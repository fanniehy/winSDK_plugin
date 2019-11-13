var plugin = requirePlugin("myPlugin");
Page({
  onLoad: function() {
    plugin.getData()
  },
  videoTap: function () {
    plugin.videoClick_report();
    // wx.navigateTo({
    //   url: 'plugin://myPlugin/show-ad',
    // });
    plugin.videoClick_report();
  }
})