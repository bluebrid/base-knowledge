## [16. 使用Promise封装AJAX请求](https://www.yuque.com/cuggz/interview/pkg93q#qKn6Y)

## [XMLHttpRequest与Fetch API](https://mp.weixin.qq.com/s/7bg4ShhDOpbnHel67wcitQ)

1. Fetch 更清晰、更简洁，并且经常使用在service worker 中
2. fetch 除了使用一个字符串的URL，也可以传递也给可配置的<font color="red">Request对象</font>
```javascript
const request = new Request("/service", { method: "POST" });
console.log(request.url);
console.log(request.method);
console.log(request.credentials);
// FormData representation of body
const fd = await request.formData();

// clone request
const req2 = request.clone();

const res = await fetch(request);
```
3. fetch的<font color="red">Response对象</font>提供了对访问的所有的详细信息
```javascript

console.log(res.ok); // true/false
console.log(res.status); // HTTP status
console.log(res.url);

const json = await res.json(); // parses body as JSON
const text = await res.text(); // parses body as text
const fd = await res.formData(); // FormData representation of body
```
4.  fetch的<font color="red">Headers 对象</font>提供了一个简单的接口来设置请求中的头部信息或获取响应中的头部信息
```javascript

// set request headers
const headers = new Headers();
headers.set("X-Requested-With", "ajax");
headers.append("Content-Type", "text/xml");

const request = new Request("/service", {
  method: "POST",
  headers,
});

const res = await fetch(request);

// examine response headers
console.log(res.headers.get("Content-Type"));
```
5. <font color="red">关于缓存：</font>，XMLHttpRequest中管理缓存比较的复杂，可能需要添加一个随机数字符串来绕过浏览器的缓存，但是Fetch 方法，在第二个参数<font color="red">init</font> 对象中内置了对缓存的支持
```javascript
const res = await fetch("/service", {
  method: "GET",
  cache: "default",
});
```
>1. 'default' —— 如果有一个新的 (未过期的) 匹配，则使用浏览器缓存；如果没有，浏览器会发出一个带条件的请求来检查资源是否已改变，并在必要时会发出新的请求
>2. 'no-store' —— 绕过浏览器缓存，并且网络响应不会更新它
>3. 'reload' —— 绕过浏览器缓存，但是网络响应会更新它
>4. 'no-cache' —— 类似于'default'，除了一个条件请求总是被做
>5. 'force-cache' —— 如果可能，使用缓存的版本，即使它过时了
>7. 'only-if-cached' —— 相同的 force-cache，除了没有网络请求

6. <font color="red">关于跨域资源共享(CORS)：</font>，首先都需要服务端配置`Access-allow-control-origin`的头部信息来支持跨域
   > 1. 如果没用配置， 两个类型都会失败，但是fetch提供了一个<font color="red">模式属性(mode:'no-cors')</font>
   > 2. 这个将返回也给不能读取，但是可以被其他API使用的响应，<font color="red" size=5>使用场景:</font>你可以使用 Cache API 存储返回再之后使用，可能从 Service Worker 返回一个图像、脚本或 CSS 文件

   ```javascript
    const res = await fetch(
      'https://anotherdomain.com/service', 
      {
        method: 'GET',
        mode: 'no-cors'
      }
    );
   ```
  7.  <font color="red">关于凭证：</font>XMLHttpRequest 总是发送浏览器的Cookie,fetch API 不会发送Cookie, 除非你显式地在第二个参数 init 对象中设置 credentials 属性
  ```javascript
  const res = await fetch("/service", {
    method: "GET",
    credentials: "same-origin",
  });
  ```
> 'omit'  —— 排除 cookie 和 HTTP 认证项 (默认)
> 'same-origin'  —— 包含对同源 url 的请求的凭证
> 'include'  —— 包含所有请求的凭证
8.  <font color="red">关于重定向：</font>默认情况下，fetch() 和 XMLHttpRequest 都遵循服务器重定向。但是，fetch() 在第二个参数 init 对象中提供了替代选项：
  ```javascript
  const res = await fetch("/service", {
    method: "GET",
    redirect: "follow",
  });
  ```
> 'follow' —— 遵循所有重定向（默认）
> 'error' —— 发生重定向时中止（拒绝）
> 'manual' —— 返回手动处理的响应
9.  <font color="red">数据流: </font>XMLHttpRequest 将整个响应读入内存缓冲区，但是 fetch() 可以流式传输请求和响应数据，这是一项新技术，流允许你在发送或接收时处理更小的数据块
```javascript

const response = await fetch("/service"),
  reader = response.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  console.log(value);
}
```

## XMLHttpRequest 的优势
1. 支持进度条的处理
```javascript
const xhr = new XMLHttpRequest();
// progress event
xhr.upload.onprogress = (p) => {
  console.log(Math.round((p.loaded / p.total) * 100) + "%");
};
```
> 1. lengthComputable —— 如果进度可以计算，则设置为 true
> 2. total —— 消息体的工作总量或内容长度
> 3. loaded —— 到目前为止完成的工作或内容的数量

2. 超时的支持， XMLHttpRequest 提供了一个`timeout`属性， 可以设置超时时长
```javascript
const xhr = new XMLHttpRequest();
xhr.timeout = 5000; // 5-second maximum
xhr.ontimeout = () => console.log("timeout");
```
3. 终止支持，XMLHttpRequest 的`abort()` 方法，可以支持取消
```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "/service");
xhr.send();
// ...
xhr.onabort = () => console.log("aborted");
xhr.abort();
```
Fetch 中断需要创建一个`AbortController`对象
```javascript

const controller = new AbortController();

fetch("/service", {
  method: "GET",
  signal: controller.signal,
})
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((error) => console.error("Error:", error)); // 终止的时候，执行catch

// abort request
controller.abort(); 
```
4. 浏览器的支持度， XMLHttpRequest 基本支持所有的浏览器

<font size=5 color="red">axios 使用的是XMLHttpRequest</font>
