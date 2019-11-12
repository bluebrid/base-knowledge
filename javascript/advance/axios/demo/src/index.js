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
document.getElementById("cancelProxy").style.background="green"
/*热更新*/
if (module.hot) {
  // -------------------3、热更新操作
  module.hot.accept(undefined, () => { // accept 第一个参数表示为undefined 表示这个本身的页面也会热更新
    // require("./index.js");
    //  renderWithHotReload(Router);
  });
}
