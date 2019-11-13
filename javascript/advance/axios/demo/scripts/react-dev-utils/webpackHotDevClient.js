/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// This alternative WebpackDevServer combines the functionality of:
// https://github.com/webpack/webpack-dev-server/blob/webpack-1/client/index.js
// https://github.com/webpack/webpack/blob/webpack-1/hot/dev-server.js

// It only supports their simplest configuration (hot updates on same server).
// It makes some opinionated choices on top, like adding a syntax error overlay
// that looks similar to our console output. The error overlay is inspired by:
// https://github.com/glenjamin/webpack-hot-middleware


// 会在webpack.config.dev.js 的entry 中注入这个文件
var SockJS = require('sockjs-client');
var stripAnsi = require('strip-ansi');
var url = require('url');
var launchEditorEndpoint = require('./launchEditorEndpoint');
var formatWebpackMessages = require('./formatWebpackMessages');
var ErrorOverlay = require('react-error-overlay');

ErrorOverlay.setEditorHandler(function editorHandler(errorLocation) {
  // Keep this sync with errorOverlayMiddleware.js
  fetch(
    launchEditorEndpoint +
      '?fileName=' +
      window.encodeURIComponent(errorLocation.fileName) +
      '&lineNumber=' +
      window.encodeURIComponent(errorLocation.lineNumber || 1) +
      '&colNumber=' +
      window.encodeURIComponent(errorLocation.colNumber || 1)
  );
});

// We need to keep track of if there has been a runtime error.
// Essentially, we cannot guarantee application state was not corrupted by the
// runtime error. To prevent confusing behavior, we forcibly reload the entire
// application. This is handled below when we are notified of a compile (code
// change).
// See https://github.com/facebookincubator/create-react-app/issues/3096
var hadRuntimeError = false;
ErrorOverlay.startReportingRuntimeErrors({
  onError: function() {
    hadRuntimeError = true;
  },
  filename: '/static/js/bundle.js',
});

if (module.hot && typeof module.hot.dispose === 'function') {
  module.hot.dispose(function() {
    // TODO: why do we need this?
    ErrorOverlay.stopReportingRuntimeErrors();
  });
}

// Connect to WebpackDevServer via a socket.
// 客户端连接sock,
var connection = new SockJS(
  // url.format 返回的是： "http://localhost:3000/sockjs-node"
  url.format({
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: window.location.port,
    // Hardcoded in WebpackDevServer
    pathname: '/sockjs-node',
  })
);

// Unlike WebpackDevServer client, we won't try to reconnect
// to avoid spamming the console. Disconnect usually happens
// when developer stops the server.
connection.onclose = function() {
  if (typeof console !== 'undefined' && typeof console.info === 'function') {
    console.info(
      'The development server has disconnected.\nRefresh the page if necessary.'
    );
  }
};

// Remember some state related to hot module replacement.
var isFirstCompilation = true;
var mostRecentCompilationHash = null;
var hasCompileErrors = false;

function clearOutdatedErrors() {
  // Clean up outdated compile errors, if any.
  if (typeof console !== 'undefined' && typeof console.clear === 'function') {
    if (hasCompileErrors) {
      console.clear();
    }
  }
}

// Successful compilation.
function handleSuccess() {
  clearOutdatedErrors();

  var isHotUpdate = !isFirstCompilation;
  isFirstCompilation = false;
  hasCompileErrors = false;

  // Attempt to apply hot updates or reload.
  if (isHotUpdate) {
    tryApplyUpdates(function onHotUpdateSuccess() {
      // Only dismiss it when we're sure it's a hot update.
      // Otherwise it would flicker right before the reload.
      ErrorOverlay.dismissBuildError();
    });
  }
}

// Compilation with warnings (e.g. ESLint).
function handleWarnings(warnings) {
  clearOutdatedErrors();

  var isHotUpdate = !isFirstCompilation;
  isFirstCompilation = false;
  hasCompileErrors = false;

  function printWarnings() {
    // Print warnings to the console.
    var formatted = formatWebpackMessages({
      warnings: warnings,
      errors: [],
    });

    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      for (var i = 0; i < formatted.warnings.length; i++) {
        if (i === 5) {
          console.warn(
            'There were more warnings in other files.\n' +
              'You can find a complete log in the terminal.'
          );
          break;
        }
        console.warn(stripAnsi(formatted.warnings[i]));
      }
    }
  }

  // Attempt to apply hot updates or reload.
  if (isHotUpdate) {
    tryApplyUpdates(function onSuccessfulHotUpdate() {
      // Only print warnings if we aren't refreshing the page.
      // Otherwise they'll disappear right away anyway.
      printWarnings();
      // Only dismiss it when we're sure it's a hot update.
      // Otherwise it would flicker right before the reload.
      ErrorOverlay.dismissBuildError();
    });
  } else {
    // Print initial warnings immediately.
    printWarnings();
  }
}

// Compilation with errors (e.g. syntax error or missing modules).
function handleErrors(errors) {
  clearOutdatedErrors();

  isFirstCompilation = false;
  hasCompileErrors = true;

  // "Massage" webpack messages.
  var formatted = formatWebpackMessages({
    errors: errors,
    warnings: [],
  });

  // Only show the first error.
  ErrorOverlay.reportBuildError(formatted.errors[0]);

  // Also log them to the console.
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    for (var i = 0; i < formatted.errors.length; i++) {
      console.error(stripAnsi(formatted.errors[i]));
    }
  }

  // Do not attempt to reload now.
  // We will reload on next success instead.
}

// There is a newer version of the code available.
function handleAvailableHash(hash) {
  // Update last known compilation hash.
  mostRecentCompilationHash = hash;
}

// Handle messages from the server.
connection.onmessage = function(e) {
  var message = JSON.parse(e.data);
  switch (message.type) {
    case 'hash':
      handleAvailableHash(message.data);
      break;
    case 'still-ok':
    case 'ok':
      handleSuccess();
      break;
    case 'content-changed':
      // Triggered when a file from `contentBase` changed.
      // 当contentBase 里面的文件改变了， 就直接重新加载文件
      window.location.reload();
      break;
    case 'warnings':
      // 文件更新发布的消息是warnings 
      // 接收到websocket 的消息， 然后会执行 handleWarnings-> tryApplyUpdates ->   module.hot.check
      handleWarnings(message.data);
      break;
    case 'errors':
      handleErrors(message.data);
      break;
    default:
    // Do nothing.
  }
};

// Is there a newer version of this code available?
function isUpdateAvailable() {
  /* globals __webpack_hash__ */
  // __webpack_hash__ is the hash of the current compilation.
  // It's a global variable injected by Webpack.
  return mostRecentCompilationHash !== __webpack_hash__;
}

// Webpack disallows updates in other states.
function canApplyUpdates() {
  return module.hot.status() === 'idle';
}

// Attempt to update code on the fly, fall back to a hard reload.
function tryApplyUpdates(onHotUpdateSuccess) {
  if (!module.hot) {
    // HotModuleReplacementPlugin is not in Webpack configuration.
    window.location.reload();
    return;
  }

  if (!isUpdateAvailable() || !canApplyUpdates()) {
    return;
  }

  function handleApplyUpdates(err, updatedModules) {
    if (err || !updatedModules || hadRuntimeError) {
      window.location.reload();
      return;
    }

    if (typeof onHotUpdateSuccess === 'function') {
      // Maybe we want to do something.
      onHotUpdateSuccess();
    }

    if (isUpdateAvailable()) {
      // While we were updating, there was a new update! Do it again.
      tryApplyUpdates();
    }
  }

  // https://webpack.github.io/docs/hot-module-replacement.html#
  
  var result = module.hot.check(/* autoApply */ true, handleApplyUpdates);
  /**
     	function hotCheck(apply) {
        if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
        hotApplyOnUpdate = apply;
        hotSetStatus("check");
        // D:\private\bluebrid\base-knowledge\javascript\advance\tools\webpack\lib\web\JsonpMainTemplatePlugin.js
        // JsonpMainTemplate.runtime.js 的方法
        return hotDownloadManifest(hotRequestTimeout).then(function(update) {
          if(!update) {
            hotSetStatus("idle");
            return null;
          }
          hotRequestedFilesMap = {};
          hotWaitingFilesMap = {};
          hotAvailableFilesMap = update.c;
          hotUpdateNewHash = update.h; // 跟新最新的hash 值
      
          hotSetStatus("prepare");
          var promise = new Promise(function(resolve, reject) {
            hotDeferred = {
              resolve: resolve,
              reject: reject
            };
          });
          hotUpdate = {};
          var chunkId = 0;
          { // eslint-disable-line no-lone-blocks
            
            hotEnsureUpdateChunk(chunkId); // 这个方法是从新加载对应的文件，通过script 脚本来加载 
          }
          if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
            hotUpdateDownloaded();
          }
          return promise;
        });
      }
    // 发起一个ajax 请求, 这里请求的文件是在HotModuleReplacementPlugin.js 中生成的。
 	 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
      requestTimeout = requestTimeout || 10000;
      return new Promise(function(resolve, reject) {
        if(typeof XMLHttpRequest === "undefined")
          return reject(new Error("No browser support"));
        try {
          var request = new XMLHttpRequest();
          var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
          request.open("GET", requestPath, true);
          request.timeout = requestTimeout;
          request.send(null);
        } catch(err) {
          return reject(err);
        }
        request.onreadystatechange = function() {
          if(request.readyState !== 4) return;
          if(request.status === 0) {
            // timeout
            reject(new Error("Manifest request to " + requestPath + " timed out."));
          } else if(request.status === 404) {
            // no update available
            resolve();
          } else if(request.status !== 200 && request.status !== 304) {
            // other failure
            reject(new Error("Manifest request to " + requestPath + " failed."));
          } else {
            // success
            try {
              var update = JSON.parse(request.responseText);
            } catch(e) {
              reject(e);
              return;
            }
            resolve(update);
          }
        };
      });
   }
      // 相当于重新请求了一个新的js 文件，从而达到不用刷新页面就会更新
      function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
        
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.charset = "utf-8";
        script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
        ;
        head.appendChild(script);
      }
   */
  // HotModuleReplacementPlugin.js 中生成了对应的：hash.hot-update.js|json
  //  new webpack.HotModuleReplacementPlugin(),
  // // Webpack 2 returns a Promise instead of invoking a callback
  if (result && result.then) {
    result.then(
      function(updatedModules) {
        handleApplyUpdates(null, updatedModules);
      },
      function(err) {
        handleApplyUpdates(err, null);
      }
    );
  }
}
