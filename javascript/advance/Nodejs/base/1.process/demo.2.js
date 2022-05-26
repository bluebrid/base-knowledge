const EventEmitter = require('events').EventEmitter;

function complexOperations() {
  const events = new EventEmitter();
  setTimeout(() => {
      console.log('setTimeout')
  })
  process.nextTick(function () {
    console.log('nextTick');
  }); 
}
console.log('Done')
complexOperations();