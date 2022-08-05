<<<<<<< HEAD
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
=======
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
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
};