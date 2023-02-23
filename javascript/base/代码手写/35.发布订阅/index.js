class EventEmmiter {
  constructor() {
    this.listener = {};
  }
  on(eventType, cb) {
    this.listener[eventType] = this.listener[eventType] || [];
    this.listener[eventType].push(cb);
  }
  off(eventType, cb) {
    const index = this.listener[eventType]?.indexOf(cb);
    if (index > -1) {
      this.listener[eventType]?.splice(index, 1);
    }
  }
  emit(eventType, msg) {
    const len = this.listener[eventType]?.length;
    for (let i = 0; i < len; i++) {
      this.listener[eventType][i]?.(msg);
    }
  }
}
EventEmmiter.getInstance = function () {
  if (!EventEmmiter.instance) {
    EventEmmiter.instance = new EventEmmiter();
  }
  return EventEmmiter.instance;
};

// const instance = (function() {
//   let ins = undefined;
//   if (!ins) {
//     ins = new EventEmmiter()
//   }
//   return ins
// })()

const instance = EventEmmiter.getInstance();
const emitter = EventEmmiter.getInstance();
const emitter2 = EventEmmiter.getInstance();

emitter.on("A", (msg) => {
  console.log("[A1]:", msg);
});
emitter.on("A", (msg) => {
  console.log("[A2]:", msg);
});
emitter.on("B", (msg) => {
  console.log("[B1]:", msg);
});
emitter.on("B", (msg) => {
  console.log("[B2]:", msg);
});
emitter.on("B", (msg) => {
  console.log("[B3]:", msg);
});
emitter.emit("A", "Hello world A");
emitter.emit("B", "Hello world B");
emitter.on("B", (msg) => {
  console.log("[B4]:", msg);
});
const listenerB5 = (msg) => {
  console.log("[B5]:", msg);
};
emitter2.on("B", listenerB5);
emitter.emit("B", "Hello world B 01");
emitter2.off("B", listenerB5);
emitter2.emit("B", "Hello world B 02");
