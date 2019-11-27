# 赢动科技广告接入SDK

## 前言
winSDK目前支持三钟视频广告模式，全屏广告、插屏广告、横幅广告，使用方可根据自身场景需求进行引入。

 - 全屏广告
 
![](./images/fullScreen.jpg)
 - 插屏广告
 
![](./images/tableScreen.jpg)
 - 横幅广告

![](./images/streamerScreen.jpg)

## 准备工作

### 添加插件

在使用插件前，首先要在小程序管理后台的“设置-第三方服务-插件管理”中添加插件。开发者可登录小程序管理后台，通过赢动广告SDK的 **appid** 查找插件并添加。添加成功后即可在项目中引入赢动广告SDK。

### 项目引入

使用插件前，使用者要在 app.json 中声明需要使用的插件，例如：
代码示例：
```
{
  "pages": [
    "pages/index/index"
  ],
  "plugins": { // 赢动SDK插件引入
    "winSDKPlugin": {
      "version": "1.0.0",
      "provider": "wxidxxxxxxxxxxxxxxxx"
    }
  }
}
```
引用名（如上例中的 winSDKPlugin）由使用者自定义，在后续的插件使用中，该引用名将被用于表示该插件。后续使用示例中，将统一使用winSDKPlugin进行示范。

到目前，使用方的准备工作完成，接下来就可以启用赢动科技广告SDK插件。

## 广告插件使用

### 全屏广告（win-fullscreen）

#### 使用方式

在对应需要使用的文件目录的.json中注册配置。
代码示例（index.json）：
```
{
  "usingComponents": {
    "win-fullscreen": "plugin://myPlugin/win-fullscreen",
  }
}
```

引入之后即可在index.wxml中使用
使用示例：

```
<win-fullscreen></win-fullscreen>
```
#### 使用方需提供的参数

sdk需要根据业务侧提供相应参数来记录广告行为，需传参如下：

- packageName: String,// 使用方的小程序名；
- appVersion: String, // 使用方的当前小程序版本；
- slotId: String,// 使用方在赢动申请的广告位ID；
- openId: String, //用户的openid；

#### 插件传参

使用方准备好参数后，可以通过组件赋值的方式进行传参：
```
<win-fullscreen appVersion="appVersion" slotId="slotId" openId="openId" packageName="packageName"></win-fullscreen>
```

### 插屏广告（win-tablescreen）

#### 使用方式

在对应需要使用的文件目录的.json中注册配置。
代码示例（index.json）：
```
{
  "usingComponents": {
    "win-fullscreen": "plugin://myPlugin/win-fullscreen",
    "win-tablescreen": "plugin://myPlugin/win-tablescreen",
  }
}
```

引入之后即可在index.wxml中使用
使用示例：
```
<win-tablescreen></win-tablescreen>
```
#### 使用方需提供的参数

sdk需要根据业务侧提供相应参数来记录广告行为，需传参如下：

- packageName: String,// 使用方的小程序名；
- appVersion: String, // 使用方的当前小程序版本；
- slotId: String,// 使用方在赢动申请的广告位ID；
- openId: String, //用户的openid；

#### 插件传参

使用方准备好参数后，可以通过组件赋值的方式进行传参：
```
<win-tablescreen appVersion="appVersion" slotId="slotId" openId="openId" packageName="packageName"></win-tablescreen>
```

### 横幅广告（win-streamerscreen）

横幅广告支持多个banner轮播

#### 使用方式

在对应需要使用的文件目录的.json中注册配置。
代码示例（index.json）：
```
{
  "usingComponents": {
    "win-fullscreen": "plugin://myPlugin/win-fullscreen",
    "win-tablescreen": "plugin://myPlugin/win-tablescreen",
    "win-streamerscreen": "plugin://myPlugin/win-streamerscreen"
  }
}
```
引入之后即可在index.wxml中使用
```
<win-streamerscreen></win-streamerscreen>
```
#### 使用方需提供的参数

sdk需要根据业务侧提供相应参数来记录广告行为，需传参如下：

- packageName: String,// 使用方的小程序名；
- appVersion: String, // 使用方的当前小程序版本；
- slotId: String,// 使用方在赢动申请的广告位ID；
- openId: String, //用户的openid；

#### 插件传参
使用方准备好参数后，可以通过组件赋值的方式进行传参：
```
<win-streamerscreen appVersion="appVersion" slotId="slotId" openId="openId" packageName="packageName"></win-streamerscreen>
```

### 广告关闭回调
当前广告播放完毕，用户可操作“关闭”按钮将画面关闭，同时使用方可以继续后续操作，只需给引入插件一个关闭的回调即可

使用方式
在引用的(.wxml)文件中使用closeAd进行绑定，该函数名固定，使用方不可更改。
```
<win-tablescreen appVersion="2.3.3" bind:closeAd="closeEvent"></win-tablescreen>
```
closeEvent由使用方自行定义,在（.js）文件中定义为普通事件方法即可
```
closePlay: function () {
  console.log('closePlay');
  const fly = this.fly;
  this.setData({ score: 0, modalHidden: "modal_hide" });
  fly.startGame();
},
```