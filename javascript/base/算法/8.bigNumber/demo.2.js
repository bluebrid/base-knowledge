<<<<<<< HEAD
const bigAdd = (num1, num2) => {
  let arr1 = num1.split('').reverse()
  let arr2 = num2.split('').reverse()
  let maxLen = arr1.length > arr2.length ? arr1.length : arr2.length;
  for (let i = 0; i < maxLen; i++) {
    let tempVal = parseInt(arr1[i] || 0) + parseInt(arr2[i] || 0)
    if (tempVal >= 10) {
      arr1[i + 1] = parseInt(arr1[i + 1] || 0) + 1
      arr1[i] = tempVal - 10;
    } else {
      arr1[i] = tempVal
    }
  }
  return arr1.reverse().join('');
}
const bigAdd1 = (num1, num2) => {
  let num1Len = num1.length
  let num2Len = num2.length;
  let temStr = ''
  let isGen10 = false;
  while (num1Len > 0 || num2Len > 0) {
    let tV1 = num1.charAt(num1Len - 1) || '0'
    let tV2 = num2.charAt(num2Len - 1) || '0'
    let tempVal = parseInt(tV1) + parseInt(tV2) + (isGen10 ? 1 : 0)
    isGen10 = false;
    if (tempVal >= 10) {
      temStr = (tempVal - 10) + temStr
      isGen10 = true;
    } else {
      temStr = tempVal + temStr
    }
    num1Len--
    num2Len--
  }
  if (isGen10) {
    temStr = 1 + temStr
  }
  return temStr;
}

const num1 = '1132', num2 = '969'
console.log(bigAdd1(num1, num2))
=======
const bigAdd = (num1, num2) => {
  let arr1 = num1.split('').reverse()
  let arr2 = num2.split('').reverse()
  let maxLen = arr1.length > arr2.length ? arr1.length : arr2.length;
  for (let i = 0; i < maxLen; i++) {
    let tempVal = parseInt(arr1[i] || 0) + parseInt(arr2[i] || 0)
    if (tempVal >= 10) {
      arr1[i + 1] = parseInt(arr1[i + 1] || 0) + 1
      arr1[i] = tempVal - 10;
    } else {
      arr1[i] = tempVal
    }
  }
  return arr1.reverse().join('');
}
const bigAdd1 = (num1, num2) => {
  let num1Len = num1.length
  let num2Len = num2.length;
  let temStr = ''
  let isGen10 = false;
  while (num1Len > 0 || num2Len > 0) {
    let tV1 = num1.charAt(num1Len - 1) || '0'
    let tV2 = num2.charAt(num2Len - 1) || '0'
    let tempVal = parseInt(tV1) + parseInt(tV2) + (isGen10 ? 1 : 0)
    isGen10 = false;
    if (tempVal >= 10) {
      temStr = (tempVal - 10) + temStr
      isGen10 = true;
    } else {
      temStr = tempVal + temStr
    }
    num1Len--
    num2Len--
  }
  if (isGen10) {
    temStr = 1 + temStr
  }
  return temStr;
}

const num1 = '1132', num2 = '969'
console.log(bigAdd1(num1, num2))
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(+num1 + +num2)