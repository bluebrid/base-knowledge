function fib1(n) {
  let result = {};
  function memory(i) {
    if (i < 1) {
      result[i] = 0;
      return 0;
    }
    if (i < 2) {
      result[i] = 1;
      return 1;
    }
    if (result[i]) {
      return result[i];
    } else {
      result[i - 1] = memory(i - 1);
      result[i - 2] = memory(i - 2);
      return result[i - 1] + result[i - 2];
    }
  }
  memory(n);
  return result[n];
  // return Object.keys(result).map(key => result[key]);
}

function fib2(n) {
  let result = {};
  if (n < 1) {
    result[n] = 0;
  }
  if (n < 2) {
    result[n] = 0;
  }
  for (var i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result[n];
  // return Object.keys(result).map(key => result[key]);
}

function fib3(stairsNum) {
  if (stairsNum < 0) {
    return 0;
  }

  const steps = new Array(stairsNum + 1).fill(0);

  steps[0] = 0;
  steps[1] = 1;
  steps[2] = 2;

  if (stairsNum <= 2) {
    return steps[stairsNum];
  }

  for (let currentStep = 3; currentStep <= stairsNum; currentStep += 1) {
    steps[currentStep] = steps[currentStep - 1] + steps[currentStep - 2];
  }

  return steps[stairsNum];
}

console.time("fib1");
fib1(4000);
console.timeEnd("fib1");

console.time("fib2");
fib2(4000);
console.timeEnd("fib2");

console.time("fib3");
fib3(4000);
console.timeEnd("fib3");
