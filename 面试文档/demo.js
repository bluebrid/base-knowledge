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