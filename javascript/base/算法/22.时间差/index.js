const getDiffDate = (start, end, diffType) => {
  const sTime = new Date(start)
  const eTime = new Date(end)
  //作为除数的数字
  let divNum = 1;
  const diffTypeMapping = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24
  }
  divNum = diffTypeMapping[diffType] || divNum
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}

console.log(getDiffDate('2020/1/2', '2020/1/4', 'day'))
console.log(getDiffDate('2020/1/2', '2020/1/4', 'hour'))
console.log(getDiffDate('2020/1/2', '2021/1/4', 'day'))