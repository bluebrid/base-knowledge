
// import './index.css'
import $ from 'jquery'

if (!PRODUCTION) {
    console.log('Debug info');
  }
  
  if (PRODUCTION) {
    console.log('Production log');
  }
  
console.log($)