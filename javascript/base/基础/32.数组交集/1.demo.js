const func = (nums1, nums2) => {
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)
    if (nums1.length < nums2.length) {
        return func(nums2, nums1)
    }
    let len1 = nums1.length;
    let len2 = nums2.length;
    let result = []
    let temp = 0;
    for (let i = 0; i < len1; i++) {
        for (let j = temp; j< len2; j++) {
            if (nums1[i] === nums2[j]) {
                result.push(nums1[i])
                temp++
            }
        }
       
    }
    return result
}
const nums1 = [1, 2, 2, 1, 8 , 11], nums2 = [2, 2, 11, 3]
console.log(func(nums1, nums2))
