const threeSum = (arr, target) => {
    arr.sort((a, b) => a - b)
    let res = []
    for (let i = 0; i < arr.length; i++) {
        const temVal = target - arr[i]
        let left = i + 1, right = arr.length - 1;
        while (left < right) {
            if (arr[left] + arr[right] > temVal) {
                right--;
                continue
            } else if (arr[left] + arr[right] < temVal) {
                left++;
                continue
            } else {
                res.push([arr[i], arr[left], arr[right]])
                while(arr[left] === arr[left+ 1]) left++
                while(arr[right] === arr[right -1]) right --
                left ++
                right--
            }
        }
    }
    return res
}
const arr = [1, 2, 4, 7, 2, 9, 5, 11, 8], target = 11
console.log(threeSum(arr, target))