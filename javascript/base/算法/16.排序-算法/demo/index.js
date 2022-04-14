const utils = require('./utils')
const bubbleSort = require('./1.bubbleSort')
const selectionSort = require('./2.selectionSort')
const insertionSort = require('./3.insertionSort')
const mergeSort = require('./4.mergeSort')
const shellSort = require('./5.shellSort')
const quickSort = require('./6.quickSort')
const heapSort = require('./7.heapSort')

const numSize = 100000
let arr = utils.generateArr(numSize)

console.time('bubbleSort')
bubbleSort(arr)
console.timeEnd('bubbleSort')

arr = utils.generateArr(numSize)
console.time('selectionSort')
selectionSort(arr)
console.timeEnd('selectionSort')

arr = utils.generateArr(numSize)
console.time('insertionSort')
insertionSort(arr)
console.timeEnd('insertionSort')

arr = utils.generateArr(numSize)
console.time('mergeSort')
mergeSort(arr)
console.timeEnd('mergeSort')

arr = utils.generateArr(numSize)
console.time('shellSort')
shellSort(arr)
console.timeEnd('shellSort')

arr = utils.generateArr(numSize)
console.time('quickSort')
quickSort(arr)
console.timeEnd('quickSort')

arr = utils.generateArr(numSize)
console.time('heapSort')
heapSort(arr)
console.timeEnd('heapSort')