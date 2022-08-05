<<<<<<< HEAD
const asyncHooks = require('async_hooks');
const asyncId = () => asyncHooks.executionAsyncId();
const triggerAsyncId = () => asyncHooks.triggerAsyncId();

Promise.resolve().then(() => {
  // Promise asyncId: 0. Promise triggerAsyncId: 0
  console.log(`Promise asyncId: ${asyncId()}. Promise triggerAsyncId: ${triggerAsyncId()}`);
})

const hooks = asyncHooks.createHook({});
hooks.enable();

Promise.resolve().then((val) => {
  // Promise asyncId: 7. Promise triggerAsyncId: 6
  console.log(`Promise asyncId: ${asyncId()}. Promise triggerAsyncId: ${triggerAsyncId()}`);
})

new Promise((resolve, reject) => {
  console.log(asyncId(), triggerAsyncId())
  resolve(1)
}).then(
  function onFullfilled(val) {
    console.log(asyncId(), triggerAsyncId())
  },
=======
const asyncHooks = require('async_hooks');
const asyncId = () => asyncHooks.executionAsyncId();
const triggerAsyncId = () => asyncHooks.triggerAsyncId();

Promise.resolve().then(() => {
  // Promise asyncId: 0. Promise triggerAsyncId: 0
  console.log(`Promise asyncId: ${asyncId()}. Promise triggerAsyncId: ${triggerAsyncId()}`);
})

const hooks = asyncHooks.createHook({});
hooks.enable();

Promise.resolve().then((val) => {
  // Promise asyncId: 7. Promise triggerAsyncId: 6
  console.log(`Promise asyncId: ${asyncId()}. Promise triggerAsyncId: ${triggerAsyncId()}`);
})

new Promise((resolve, reject) => {
  console.log(asyncId(), triggerAsyncId())
  resolve(1)
}).then(
  function onFullfilled(val) {
    console.log(asyncId(), triggerAsyncId())
  },
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
  function onRejected(error) { })