import axios from "./axios/lib/axios";
import retryInterceptor from "axios-retry-interceptor";

var ISO_8601 = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})Z/;
function formatDate(d) {
  return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
}

axios.interceptors.request.use(
  function(config) {
    // 只会接收config参数， 一般是对config配置进行加工
    return config;
    // return Promise.reject('customReject');
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // 只会接收response 参数，一般是对response的数据进行加工
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios
  .get("https://api.github.com/users/mzabriskie", {
    transformResponse: axios.defaults.transformResponse.concat(function(
      data,
      headers
    ) {
      Object.keys(data).forEach(function(k) {
        if (ISO_8601.test(data[k])) {
          data[k] = new Date(Date.parse(data[k]));
        }
      });
      return data;
    })
  })
  .then(
    function(res) {
      // document.getElementById("useravatar").src = res.data.avatar_url;
      document.getElementById("username").innerHTML = res.data.name;
      document.getElementById("created").innerHTML = formatDate(
        res.data.created_at
      );
      document.getElementById("updated").innerHTML = formatDate(
        res.data.updated_at
      );
    },
    err => {
      console.log(err);
    }
  );

let source = axios.CancelToken.source();
// retryInterceptor(axios, {
//   maxAttempts: 3,
//   waitTime: 1000
// });
/**
 * 1. axios.CancelToken.source 就是创建了一个对象(对象是引用类型)
 * return {
    token: token,
    cancel: cancel
  };
  2. 在xhr.js 中， 会去判断config 中是否有cancelToken 配置，如果有， 则去监听promise 的then:
   config.cancelToken.promise.then(function onCanceled(cancel) { // cancelToken 指向的是source.token, 是一个CancelToken 对象， 有一个内置的promise的实例属性
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
 */

document.getElementById("send").addEventListener("click", () => {
  source = axios.CancelToken.source();
  axios
    .get("/users", {
      cancelToken: source.token,
      // timeout: 1000 * 2,
      onUploadProgress: function(e) {
        console.log(e);
      }
    })
    .then(res => {
      alert(JSON.stringify(res.data));
    });
});

document.getElementById("cancel").addEventListener("click", () => {
  source.cancel("用户撤销了请求");
});

document.getElementById("sendProxy").addEventListener("click", () => {
  source = axios.CancelToken.source();
  axios
    .get("/api/users", {
      cancelToken: source.token,
      // timeout: 1000 * 2,
      onUploadProgress: function(e) {
        console.log(e);
      }
    })
    .then(res => {
      alert(JSON.stringify(res.data));
    });
});

document.getElementById("cancelProxy").addEventListener("click", () => {
  source.cancel("用户撤销了请求");
});
document.getElementById("cancelProxy").style.border="1px solid green"
document.getElementById("cancelProxy").style.background="red"
/*热更新*/
/**
 * 1. 每一个文件都是一个module
 * 2. 每个module都保存了对应的ID：也就是对应的文件的路径
 * 3. module.hot.accpet就是将module.hot 里面的_selfAccepted值设置为true,
 * 4. 后面webpack 重新编译会去检测对应的module(文件)module.hot._selfAccepted 为true, 如果为true 则需要热更新， 
 * 5. 如果为true, 则在Webpack 在编译的时候会生成[hash].hot-update.[json|js]文件
 * 6. 在webpack-dev-server 中会给webpack 添加插件： compiler.plugin('done', ...) ， 也就是在webpack 编译完成后，要执行的方法
 *  compiler.plugin('done', (stats) => {// webpack 编译完成后， 会执行done, 然后通过websocket 去通知浏览器
      this._sendStats(this.sockets, stats.toJson(clientStats));
      this._stats = stats;
    });
 * 7. 在_sendStats 方法中， 会用socket 广播一个事件：['errors', 'warnings', 'ok']
    Server.prototype.sockWrite = function (sockets, type, data) {
      sockets.forEach((sock) => {
        sock.write(JSON.stringify({
          type,
          data
        }));
      });
    };
 * 8. 客户端的Websocket 就会监听到对应的事件
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
          window.location.reload();
          break;
        case 'warnings':
          handleWarnings(message.data);
          break;
        case 'errors':
          handleErrors(message.data);
          break;
        default:
        // Do nothing.
      }
    };
 * 9. 如果是contextBase 里面的内容改变了， 则执行window.location.reload(); 重新加载页面
 * 10. 如果监听到的事件是： ok,则执行handleSuccess：
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
 * 11, 则运行： tryApplyUpdates 方法，其中主要逻辑是：
      var result = module.hot.check( true, handleApplyUpdates);
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
 * 12. hotcheck 方法中，会去下载[hash].hot-update.json 文件
    	function hotCheck(apply) {
        if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
        hotApplyOnUpdate = apply;
        hotSetStatus("check");
        return hotDownloadManifest(hotRequestTimeout).then(function(update) {
          if(!update) {
            hotSetStatus("idle");
            return null;
          }
          hotRequestedFilesMap = {};
          hotWaitingFilesMap = {};
          hotAvailableFilesMap = update.c;
          hotUpdateNewHash = update.h;
      
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
            hotEnsureUpdateChunk(chunkId);
          }
          if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
            hotUpdateDownloaded();
          }
          return promise;
        });
      }
 * 14. 下载完成[hash].hot-update.json 后，会将返回的新的hash值保存在hotUpdateNewHash = update.h;
 * 15. 同时会执行hotEnsureUpdateChunk(chunkId);方法，这个方法就是去真正重新加载更新后的js 文件
 *    	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
          var head = document.getElementsByTagName("head")[0];
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.charset = "utf-8";
          script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
          head.appendChild(script);
        }
 */
console.log(module)
if (module.hot) {
  // -------------------3、热更新操作
  // HotModuleReplacement.runtime.js 中定义了accept
  module.hot.accept(undefined, () => { // accept 第一个参数表示为undefined 表示这个本身的页面也会热更新
    // require("./index.js");
    //  renderWithHotReload(Router);
  });
}
/*
function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
  var hot = {
    // private stuff
    _acceptedDependencies: {},
    _declinedDependencies: {},
    _selfAccepted: false,
    _selfDeclined: false,
    _disposeHandlers: [],
    _main: hotCurrentChildModule !== moduleId,

    // Module API
    active: true,
    accept: function(dep, callback) {
      if(typeof dep === "undefined")
        hot._selfAccepted = true;
      else if(typeof dep === "function")
        hot._selfAccepted = dep;
      else if(typeof dep === "object")
        for(var i = 0; i < dep.length; i++)
          hot._acceptedDependencies[dep[i]] = callback || function() {};
      else
        hot._acceptedDependencies[dep] = callback || function() {};
    },
    decline: function(dep) {
      if(typeof dep === "undefined")
        hot._selfDeclined = true;
      else if(typeof dep === "object")
        for(var i = 0; i < dep.length; i++)
          hot._declinedDependencies[dep[i]] = true;
      else
        hot._declinedDependencies[dep] = true;
    },
    dispose: function(callback) {
      hot._disposeHandlers.push(callback);
    },
    addDisposeHandler: function(callback) {
      hot._disposeHandlers.push(callback);
    },
    removeDisposeHandler: function(callback) {
      var idx = hot._disposeHandlers.indexOf(callback);
      if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
    },

    // Management API
    check: hotCheck,
    apply: hotApply,
    status: function(l) {
      if(!l) return hotStatus;
      hotStatusHandlers.push(l);
    },
    addStatusHandler: function(l) {
      hotStatusHandlers.push(l);
    },
    removeStatusHandler: function(l) {
      var idx = hotStatusHandlers.indexOf(l);
      if(idx >= 0) hotStatusHandlers.splice(idx, 1);
    },

    //inherit from previous dispose call
    data: hotCurrentModuleData[moduleId]
  };
  hotCurrentChildModule = undefined;
  return hot;
}*/