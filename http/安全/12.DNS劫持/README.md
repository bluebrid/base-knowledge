[http网络劫持与DNS劫持原理及预防](https://juejin.im/post/5cb00dec6fb9a0686a22404c)
[【周刊-2】三年大厂面试官-前端面试题（偏难）](https://juejin.im/post/5cb0315f518825215e61ec14)
## DNS 劫持
> 一般而言，用户上网的DNS服务器都是运营商分配的，所以在这个节点上，运营上可以为所欲为
> 例如，我们访问`http://jiankang.qq.com/index.html`, 正常的DNS应该返回的是腾讯的IP
> 而DNS劫持后， 会返回一个运营商的中间服务器IP，访问该服务器会一致性的返回**302**
> 让用户的浏览器跳转到预处理好的**带广告**的网页上， 在该网页上在通过**iframe**打开原来的访问的地址

## 劫持的方式
1. 直接返回一个带广告的HMTL
2. 在原有的html中添加JS脚本，在通过JS脚本注入广告
3. iframe 展示原来的正常网页


## 处理方式
1. 对用户来说，最直接的方式就是向运营商投诉
2. 在HTML头部加上`<meta http-equiv="Cache-Control" content="no-siteapp"> <meta http-equiv="Cache-Control" content="no-transform " />`
3. 最有用的方式是使用`https`, 不让数据那么裸奔
4. 在开发的网页中，加入代码过滤，大概的思路是用JavaScript检查所有的外链接是否属于白名单

## JS 处理方式
1. 在Window监听`DOMNodeInserted`事件， 上报插入的DOM， 分析插入的DOM信息(通常匹配所有的URL，逐个匹配是否在**白名单**中，如果不是，则认为被劫持，上报系统，并删除节点)
```javascript
window.addEventListener('DOMNodeInserted', checkDivHijack);    
function checkDivHijack(e) {
        var html = e ? (e.srcElement.outerHTML || e.srcElement.wholeText) : $('html').html();
        var reg = /http:\/\/([^\/]+)\//g;
        var urlList = html.match(reg);
        // 1. 先判断嵌入的DOM结构中是否存在http等连接
        if (!urlList || urlList.length == 0) {
            return;
        }
        // 2. 判断存在的连接是否是属于我们的白名单
        reg = /^http:\/\/(.*\.qq\.com|.*\.gtimg\.cn|.*\.qlogo\.cn|.*\.qpic\.cn|.*\.wanggou\.com)\/$/;
        var hijack = false;
        for (var i = 0; i < urlList.length; i++) {
            if (!reg.test(urlList[i])) {
                hijack = true;
                break;
            }
        }
}
```
2. 如果是iframe插入的情况， 通过比较`self`和`top`是否相同来进行处理，可以在服务端设置`X-Frame-Options`响应头
> 1. DENY：浏览器拒绝当前页面加载任何Frame页面
> 2. SAMEORIGIN：frame页面的地址只能为同源域名下的页面
> 3. ALLOW-FROM：origin为允许frame加载的页面地址