1. 客户端发送一个WS的连接， header 会有一个**Upgrade: websocket** 的字段
2. header 还有一个key: `Sec-Websocket-Key: tNS1KG2c5asMGJo5MfPfYA==`
3. 后端接收前端的请求后，会去判断`incoming.upgrade` ，其实也就是去判断header 中是否有`upgrade`
4. 如果是`upgrade`, 则去广播一个`upgrade`事件
5. 在`server`的`upgrade`的监听事件中， 利用`WebSocektServer`的`handleUpgrade`事件， 然后也就是创建了连接
6. 创建连接后， 服务端相应头部信息包含：
```
Connection: Upgrade
Sec-WebSocket-Accept: EYU97IjzcDvfWrvoLMsTnnbTni8= // 然后， Sec-WebSocket-Accept 这个则是经过服务器确认，并且加密过后的 Sec-WebSocket-Key 。 服务器：好啦好啦，知道啦，给你看我的ID CARD来证明行了吧。。
Upgrade: websocket // 
``` 
```javascript
server.on('upgrade', function(request, socket, head) {
  console.log('Parsing session from request...');

  sessionParser(request, {}, () => {
    if (!request.session.userId) {
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, function(ws) {
      wss.emit('connection', ws, request);
    });
  });
});
```
6. Websocket 是一个持久化协议， 而Http是非持久的协议
7. Http是通过Request 来界定的，也就是一个Request对应一个Response, 而且Response 是被动发送， 不能主动发送
8. 虽然Http1.1改进使用了keep-live, 但也只是说在一个http 连接(tcp/ip)连接，可以发送多个request
9. 使用场景：
> 1. 信息需要实时更新的，如聊天系统
> 2. 需要服务器推送消息， 如股票的实时价格信息
> 3. 如OA系统的待办事项的数据信息

