https://github.com/Nealyang/PersonalBlog/issues/55
https://juejin.im/post/5d693d8b6fb9a06aca383488
https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

https://juejin.im/post/5d5b4c2df265da03dd3d73e5

我们已经知道宏任务结束后，会执行渲染，然后执行下一个宏任务，
而微任务可以理解成在当前宏任务执行后立即执行的任务。
也就是说，当宏任务执行完，会在渲染前，将执行期间所产生的所有微任务都执行完。
Promise，process.nextTick等，属于微任务。
1. 执行一个宏任务（栈中没有就从事件队列中获取）
2. 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
3. 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
4. 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
5. 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）
 