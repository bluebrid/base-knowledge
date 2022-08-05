<<<<<<< HEAD
/**
 * 给定数组 people 。people[i]表示第 i 个人的体重 ，船的数量不限，每艘船可以承载的最大重量为 limit。
 * 每艘船最多可同时载两人，但条件是这些人的重量之和最多为 limit
 * 返回 承载所有人所需的最小船数 。
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
// 每只穿最多只能装2人
var numRescueBoats = function (people, limit) {
  people.sort((a, b) => b - a) // 先进行降序排序
  let left = 0, right = people.length - 1;
  let count = 0;
  while (left <= right) {
    if (people[left] >= limit) {
      left++;
      count++
    } else {
      if (people[left] + people[right] > limit) {
        left++;
        count++
      } else {
        left++;
        right--;
        count++;
      }
    }

  }
  return count
};
// const people = [1, 2], limit = 3
// const people = [3,2,2,1], limit = 3
const people = [3, 5, 3, 4], limit = 5
=======
/**
 * 给定数组 people 。people[i]表示第 i 个人的体重 ，船的数量不限，每艘船可以承载的最大重量为 limit。
 * 每艘船最多可同时载两人，但条件是这些人的重量之和最多为 limit
 * 返回 承载所有人所需的最小船数 。
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
// 每只穿最多只能装2人
var numRescueBoats = function (people, limit) {
  people.sort((a, b) => b - a) // 先进行降序排序
  let left = 0, right = people.length - 1;
  let count = 0;
  while (left <= right) {
    if (people[left] >= limit) {
      left++;
      count++
    } else {
      if (people[left] + people[right] > limit) {
        left++;
        count++
      } else {
        left++;
        right--;
        count++;
      }
    }

  }
  return count
};
// const people = [1, 2], limit = 3
// const people = [3,2,2,1], limit = 3
const people = [3, 5, 3, 4], limit = 5
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(numRescueBoats(people, limit))