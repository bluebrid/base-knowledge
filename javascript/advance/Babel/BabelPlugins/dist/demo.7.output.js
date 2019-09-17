function square(x) {
  var b = x * x;
  return function () {
    return b + x;
  };
}

var n = 1;
