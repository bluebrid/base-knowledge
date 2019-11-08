import axios from "./axios/lib/axios";

var ISO_8601 = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})Z/;
function formatDate(d) {
  return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
}

axios.interceptors.request.use(
  function(config) {// 只会接收config参数， 一般是对config配置进行加工
    return config;
    // return Promise.reject('customReject');
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {// 只会接收response 参数，一般是对response的数据进行加工
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
  .then(function(res) {
    document.getElementById("useravatar").src = res.data.avatar_url;
    document.getElementById("username").innerHTML = res.data.name;
    document.getElementById("created").innerHTML = formatDate(
      res.data.created_at
    );
    document.getElementById("updated").innerHTML = formatDate(
      res.data.updated_at
    );
  });
