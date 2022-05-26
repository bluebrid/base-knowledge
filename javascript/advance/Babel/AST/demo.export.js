exports.add = (a, b) => {
  return a + b
};

exports.sub = (a, b) => {
  return a - b
};

exports.commonDivision = (a, b) => {
  while (b !== 0) {
    if (a > b) {
      a = exports.sub(a, b)
    } else {
      b = exports.sub(b, a)
    }
  }
  return a
};