Number.prototype.add = function (number) {
  if (typeof number !== 'number') {
    throw new Error('请输入数字～');
  }
  return this + number;
};
Number.prototype.minus = function (number) {
  if (typeof number !== 'number') {
    throw new Error('请输入数字～');
  }
  return this - number;
};
console.log((5).add(3).minus(2));

const debounce = (cb, option = {}) => {
  if (Object.prototype.toString.call(cb) !== '[object Function]') {
    return;
  }
  const { isImmediate = false, delay = 1 } = option

  let timerId
  const wrapFunc = () => {
    if (!timerId && isImmediate) {
      cb();
    }
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      cb()
    }, 1000 * delay)
  }
  wrapFunc.cancel = () => {
    clearInterval(timerId)
  }
  return wrapFunc
} 