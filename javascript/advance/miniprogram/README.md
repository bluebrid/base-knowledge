<<<<<<< HEAD
1. 小程序使用的是双线程： 视图线程View 和 逻辑线程App service
> 视图线程： 负责渲染视图层，主题提供组件，渲染界面

> 逻辑线程： 负责逻辑层，主要提供各种API来进行业务逻辑处理

两者通过`weixinJSBridge`进行通信的
![image.png](https://imgcache.qq.com/operation/dianshi/other/0b8c427c5ad45e5105b390c6957c3_w662_h1014.e5da22e1853f0db7f65f52816a4224019b340573.png)


![image.png](https://imgcache.qq.com/operation/dianshi/other/1645168911-8551-620f490fd0c8b-846493.4e169eb1fdb4f08d7b23614b12a2c739c789cd8d.png)
rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

## 优化策略
1. 将一些静态资源， 如图片， 音频，视频，字体等较大的资源，放在CDN，减少原始代码的大小
2. 通过webview 动态化页面
3. 静态数据线上处理+ 缓存
4. 去除冗余的代码，提取公共模块
5. 分包配置，主包尽可能的小，让首次加载快，封面方案， 首页也许就是一个封面而已
6. setState的处理
 

=======
1. 小程序使用的是双线程： 视图线程View 和 逻辑线程App service
> 视图线程： 负责渲染视图层，主题提供组件，渲染界面

> 逻辑线程： 负责逻辑层，主要提供各种API来进行业务逻辑处理

两者通过`weixinJSBridge`进行通信的
![image.png](https://imgcache.qq.com/operation/dianshi/other/0b8c427c5ad45e5105b390c6957c3_w662_h1014.e5da22e1853f0db7f65f52816a4224019b340573.png)


![image.png](https://imgcache.qq.com/operation/dianshi/other/1645168911-8551-620f490fd0c8b-846493.4e169eb1fdb4f08d7b23614b12a2c739c789cd8d.png)
rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

## 优化策略
1. 将一些静态资源， 如图片， 音频，视频，字体等较大的资源，放在CDN，减少原始代码的大小
2. 通过webview 动态化页面
3. 静态数据线上处理+ 缓存
4. 去除冗余的代码，提取公共模块
5. 分包配置，主包尽可能的小，让首次加载快，封面方案， 首页也许就是一个封面而已
6. setState的处理
 

>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
