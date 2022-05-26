## 类型
1. 非持久型XSS(反射型XSS)
2. 持久型XSS(存储型XSS)

### 非持久性的攻击
> 在第三方钓鱼网站, 设置一个连接， 连接到信任的网站， 连接如： `https://xxx.com/xxx?default=<script>alert(document.cookie)</script>`

> 在信任的完整去解析URL参数：

```html
<select>
    <script>
        document.write(''
            + '<option value=1>'
            +     location.href.substring(location.href.indexOf('default=') + 8)
            + '</option>'
        );
        document.write('<option value=2>English</option>');
    </script>
</select>
```
**特点**

1. 即时性，不经过服务器存储，直接通过 HTTP 的 GET 和 POST 请求就能完成一次攻击，拿到用户隐私数据。
2. 攻击者需要诱骗点击,必须要通过用户点击链接才能发起
3. 反馈率低，所以较难发现和响应修复
4. 盗取用户敏感保密信息
