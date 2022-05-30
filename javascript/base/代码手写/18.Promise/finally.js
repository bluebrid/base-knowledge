Promise.prototype.sx_finally = function (fn) {
    return this.then((res) => {
      fn()
      return res
    }).catch((err) => {
      fn()
      return err
    })
  }