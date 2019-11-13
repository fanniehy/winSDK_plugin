export async function videoClick_report () {
  try {
    var value = await wx.getStorageSync('win_adInfo');
    const { clickUrl } = JSON.parse(value);
    if (value) {
      return clickUrl;
    }
  } catch (e) {
    // Do something when catch error
  }
}