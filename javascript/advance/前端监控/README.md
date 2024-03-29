[前端监控demo](https://github.com/LianjiaTech/fee)

## 浏览器工作原理
1. 浏览器会解析三个模块: Dom, CSS, JS
2. 下载HTML文件后， 回去解析HTML，生成Dom Tree
3. 遇到CSS脚本或者CSS文件， 会生成一个CSS Rule Tree
4. 如果在解析DOM的时候，遇到CSS脚本文件，不会阻塞DOM Tree的构建，但是会阻塞Render Tree的生成， 因为是需要将DOM tree和CSS rule Tree 合并成一个Render Tree
5. 如果遇到JS脚本和文件， 会阻塞DOM 树的解析， 因为JS会去操作Dom 和 CSS
6. 所以建议将JS文件放在最下面
7. 将Dom Tree 和 CSS rule tree 合并成一个Render tree
8. 生成render tree 后， 会去计算每一个DOM的具体位置和大小，也就是Layout(reflow, 重排，回流)
9. Render tree 并不等同于Dom 树，因为在Render tree中不会显示header 和隐藏的元素
10. 调用操作系统的Native GUI的API绘制Render tree 到屏幕中

## 造成重排(reflow)和重绘(repaint)的原因
1. 增加，删除或者修改DOM节点
2. 移动DOM的位置，开始动画的时候
3. 修改CSS样式，改变DOM的大小，位置，或者用display:none 会造成**重排**， 如果修改CSS颜色或者设置visibility:hidden会造成**重绘**
4. 修改页面的默认字体
5. Resize 页面窗口，或者滚动的时候
6. 内容改变，如果输入框中写入内容
7. 激活伪类
8. 计算offsetwidth, offsetHeight,scroll,clientHeight,clientWidht,getComputeStyles..

## 如何减少重排和重绘
1. 尽量避免对Style的使用， 需要操作DOM的样式，最好用className,通过更新className 来批量更新样式
2. 尽量避免多次读取同一个元素， 读取一个元素后， 用变量保存，再次使用
3. 如果需要添加或者clone 元素，可以先把元素放在documentFragement中，存入内存，等操作完毕后，再appendChild到DOM元素中
4. 尽量少使用display:none, 可以使用visibility:hidden 来代替， 或者对需要频繁使用display 的元素，让其通过position: absolute/fixed 来脱离文档流在操作
5. 不要使用table布局，因为如果一个小的操作，都会造成整个table 的重排
6. 使用resize事件的时候，添加防抖和节流处理
7. 对动画和批量修改元素的时候，让其脱离文档里， 等修改完成后， 在将其放入文档流里面

## 性能优化的方向
1. 降低请求量
> 1. 合并资源： js 文件合并， CSS文件合并
> 2. 减少HTTP请求书，如果图片处理，雪碧图， 字体图标
> 3. 图片的懒加载
> 4. 启动gzip, minify文件
2. 加快请求速度
> 1. 预解析DNS pre-fetch, 
> 2. 减少域名数
> 3. CDN分发
> 4. http1.1 keep-alive， http2.0 协议升级
> 5. 利用preconnect 对tcp/ip 提前进行连接`<link rel="preconnect" href="//example.com">`
3. 缓存文件处理
> 1. 用PWA缓存请求结果
> 2. 浏览器进行缓存，强缓存: Expires, Cache-Control ,协商缓存: last-modify/if-modify-since, etag/if-none-match
> 3. localstorage, indexDB, 进行离线缓存
> 4. 服务器层面的缓存， 比如利用redis进行请求数据的缓存，减少DB的压力
4. 渲染层面处理
> 1. 尽快让首屏展示处理， 其中涉及到JS的文件的存放位置，以及图片的处理(图片懒加载)， 避免使用css表达式， 将css文件放在顶部，JS文件放在底部
> 2. 尽量少的减少重排和重绘
> 3. 服务端渲染(SSR 服务端直出)
