class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.stack = this.#init(nums);
  }
  #init(nums) {
    return nums.sort((a, b) => a - b);
  }
  add(num) {
    const len = this.stack.length;
    if (num >= this.stack[len]) {
      this.stack.push(num);
      return this.stack[this.k - 1];
    }
    for (let i = 0; i < len; i++) {
      if (this.stack[i] > num) {
        this.stack.splice(i, 0, num);
        return this.stack[this.k - 1];
      }
    }
    return this.stack[this.k - 1];
   
  }
}

const  kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3));   // return 4
console.log(kthLargest.add(5));   // return 5
console.log(kthLargest.add(10));  // return 5
console.log(kthLargest.add(9));   // return 8
console.log(kthLargest.add(4));   // return 8