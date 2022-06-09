const twoSum = (arr, target) => {
    arr.sort((a, b) => a - b)
    let left = 0, right = arr.length -1
    let res = []
    while(left <= right) {
        if (arr[left] >= target) return res;
        if (target[right] >= target) {
            right --
            continue
        }
        if (arr[left] + arr[right] > target) {
            right --;
            continue
        } 
        if (arr[left] + arr[right] < target) {
            left ++;
            continue
        }
        if (arr[left] + arr[right] === target) {
            return [arr[left], arr[right]]
        }
    }
}
const arr = [1, 5, 2, 7, 9], target = 9
console.log(twoSum(arr, target))