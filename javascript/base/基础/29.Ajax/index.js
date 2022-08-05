// promise 封装实现：
function getJSON(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', url)
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.onerror = () => {
      reject(new Error(this.statusText))
    }
    // 设置响应的数据类型
    xhr.responseType = "json"
    xhr.setRequestHeader('Accept', 'application/json')
    // 发送Http 请求
    xhr.send(null)
  })
}