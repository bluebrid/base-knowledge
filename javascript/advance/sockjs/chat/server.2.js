'use strict';

const session = require('express-session');
const express = require('express');
const http = require('http');
const uuid = require('uuid');
// https://www.cnblogs.com/peiyu1988/p/8443865.html
// https://www.cnblogs.com/peiyu1988/p/8192066.html
const WebSocket = require('./ws');

const app = express();
const map = new Map();

//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = session({
  saveUninitialized: false,
  secret: '$eCuRiTy',
  resave: false
});

//
// Serve static files from the 'public' folder.
//
app.use(express.static('public'));
app.use(sessionParser);

app.post('/login', function(req, res) {
  //
  // "Log in" user and set userId to session.
  //
  const id = uuid.v4();

  console.log(`Updating session for user ${id}`);
  req.session.userId = id;
  res.send({ result: 'OK', message: 'Session updated', userId: id });
});

app.delete('/logout', function(request, response) {
  const ws = map.get(request.session.userId);

  console.log('Destroying session');
  request.session.destroy(function() {
    if (ws) ws.close();

    response.send({ result: 'OK', message: 'Session destroyed' });
  });
});

//
// Create HTTP server by ourselves.
//
/**
 * function createServer(opts, requestListener) {
      return new Server(opts, requestListener);
    }
    function Server(options, requestListener) {
  if (!(this instanceof Server)) return new Server(options, requestListener);

  if (typeof options === 'function') {
    requestListener = options;
    options = {};
  } else if (options == null || typeof options === 'object') {
    options = util._extend({}, options);
  }

  this[kIncomingMessage] = options.IncomingMessage || IncomingMessage;
  this[kServerResponse] = options.ServerResponse || ServerResponse;
  // 通过net.Server 创建一个真正的server
  net.Server.call(this, { allowHalfOpen: true });

  if (requestListener) {
    this.on('request', requestListener); // 监听request 事件， requestListener 就是我们在执行http.createServer方法时，传递进去的参数，也就是express() 返回的handle
  }

  // Similar option to this. Too lazy to write my own docs.
  // http://www.squid-cache.org/Doc/config/half_closed_clients/
  // http://wiki.squid-cache.org/SquidFaq/InnerWorkings#What_is_a_half-closed_filedescriptor.3F
  this.httpAllowHalfOpen = false;

  this.on('connection', connectionListener);

  this.timeout = 2 * 60 * 1000;
  this.keepAliveTimeout = 5000;
  this._pendingResponseData = 0;
  this.maxHeadersCount = null;
  this.headersTimeout = 40 * 1000; // 40 seconds
}
 */
/**
 * _http_server.js:
 * function parserOnIncoming(server, socket, state, req, keepAlive) {
  resetSocketTimeout(server, socket, state);

  if (server.keepAliveTimeout > 0) {
    req.on('end', resetHeadersTimeoutOnReqEnd);
  }

  // Set to zero to communicate that we have finished parsing.
  socket.parser.parsingHeadersStart = 0;

  if (req.upgrade) {
    req.upgrade = req.method === 'CONNECT' ||
                  server.listenerCount('upgrade') > 0;
    if (req.upgrade)
      return 2;
  }

  state.incoming.push(req);

  // If the writable end isn't consuming, then stop reading
  // so that we don't become overwhelmed by a flood of
  // pipelined requests that may never be resolved.
  if (!socket._paused) {
    var ws = socket._writableState;
    if (ws.needDrain || state.outgoingData >= socket.writableHighWaterMark) {
      socket._paused = true;
      // We also need to pause the parser, but don't do that until after
      // the call to execute, because we may still be processing the last
      // chunk.
      socket.pause();
    }
  }

  var res = new server[kServerResponse](req);
  res._onPendingData = updateOutgoingData.bind(undefined, socket, state);

  res.shouldKeepAlive = keepAlive;
  DTRACE_HTTP_SERVER_REQUEST(req, socket);
  COUNTER_HTTP_SERVER_REQUEST();

  if (socket._httpMessage) {
    // There are already pending outgoing res, append.
    state.outgoing.push(res);
  } else {
    res.assignSocket(socket);
  }

  // When we're finished writing the response, check if this is the last
  // response, if so destroy the socket.
  res.on('finish',
         resOnFinish.bind(undefined, req, res, socket, state, server));

  if (req.headers.expect !== undefined &&
      (req.httpVersionMajor === 1 && req.httpVersionMinor === 1)) {
    if (continueExpression.test(req.headers.expect)) {
      res._expect_continue = true;

      if (server.listenerCount('checkContinue') > 0) {
        server.emit('checkContinue', req, res);
      } else {
        res.writeContinue();
        server.emit('request', req, res);
      }
    } else if (server.listenerCount('checkExpectation') > 0) {
      server.emit('checkExpectation', req, res);
    } else {
      res.writeHead(417);
      res.end();
    }
  } else {
    server.emit('request', req, res); // 广播request 事件
  }
  return 0;  // No special treatment.
}
 */
const server = http.createServer(app);

// const wss = new WebSocket.Server({server});

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });
/**
 * _http_server.js 中，判断parser.incoming && parser.incoming.upgrade 来进行upgrade 事件的处理
  function onParserExecuteCommon(server, socket, parser, state, ret, d) {
  resetSocketTimeout(server, socket, state);

  if (ret instanceof Error) {
    ret.rawPacket = d || parser.getCurrentBuffer();
    debug('parse error', ret);
    socketOnError.call(socket, ret);
  } else if (parser.incoming && parser.incoming.upgrade) {
    // Upgrade or CONNECT
    var bytesParsed = ret;
    var req = parser.incoming;
    debug('SERVER upgrade or connect', req.method);

    if (!d)
      d = parser.getCurrentBuffer();

    socket.removeListener('data', state.onData);
    socket.removeListener('end', state.onEnd);
    socket.removeListener('close', state.onClose);
    socket.removeListener('drain', state.onDrain);
    socket.removeListener('drain', ondrain);
    socket.removeListener('error', socketOnError);
    unconsume(parser, socket);
    parser.finish();
    freeParser(parser, req, socket);
    parser = null;

    var eventName = req.method === 'CONNECT' ? 'connect' : 'upgrade';
    if (eventName === 'upgrade' || server.listenerCount(eventName) > 0) {
      debug('SERVER have listener for %s', eventName);
      var bodyHead = d.slice(bytesParsed, d.length);

      socket.readableFlowing = null;
      server.emit(eventName, req, socket, bodyHead);
    } else {
      // Got CONNECT method, but have no handler.
      socket.destroy();
    }
  }

  if (socket._paused && socket.parser) {
    // onIncoming paused the socket, we should pause the parser as well
    debug('pause parser');
    socket.parser.pause();
  }
}
 */
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


wss.on('connection', function(ws, request) {
  const userId = request.session.userId;
  // 对应的用户和ws 关联起来
  map.set(userId, ws);

  ws.on('message', function(message) {
    //
    // Here we can now use session parameters.
    //
    console.log(`Received message ${message} from user ${userId}`);
  });

  ws.on('close', function() {
    map.delete(userId);
  });
});

//
// Start the server.
//
server.listen(8080, function() {
  console.log('Listening on http://localhost:8080');
});