var plugin = requirePlugin("myPlugin");
Page({
  data: {
    screenType: '',
  },
  onLoad: function() {
    plugin.getData()
  },
  showScreen: function (event) {
    this.setData({
      screenType: event.currentTarget.dataset.screenType
    });
  },
})