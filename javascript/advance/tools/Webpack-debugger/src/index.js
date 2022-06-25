
// import './index.css'
// import $ from 'jquery'
import demoAdd from './demo'
let a = 11;
console.log(a)
console.log(PRODUCTION)
console.log(demoAdd(1,2))
if (!PRODUCTION) {
  console.log('Debug info');
}
console.log(VERSION)
if (PRODUCTION) {
  console.log('Production log');
}

// console.log($)