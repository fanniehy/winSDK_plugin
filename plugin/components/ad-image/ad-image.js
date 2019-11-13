// plugin/components/ad-image/ad-image.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    endAction: {
      type: String
    },
    isSuc: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeAd: function () {
      this.triggerEvent("closeTap", { isShow: false });
    },
    adTap: function (event) {
      const { detail } = event;
      this.triggerEvent('adTap', { position: detail });
    }
  }
})
