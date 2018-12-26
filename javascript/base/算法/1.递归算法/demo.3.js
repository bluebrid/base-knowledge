

/**
 * https://github.com/bluebrid/javascript-algorithms/blob/master/src/algorithms/uncategorized/recursive-staircase/recursiveStaircaseDP.js
 * 斐波那契数列
 * 1、1、2、3、5、8、13、21、34
 */
function recursiveStaircaseDP(stairsNum) {
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