function square(n) {
    var b =  n * n;
    return function () {
        return b + n;
    }
  }
  var n = 1;