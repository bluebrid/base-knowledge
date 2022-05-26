function debounce(fn, options = {}) {
  let handler = null;
  return () => {
    if (options.immediate) {
      options.immediate = false;
      fn();
    }
    if (handler) {
      clearTimeout(handler);
      handler = null;
    }
    console.log('handler =>', handler)
    handler = setTimeout(function() {
      console.log("1111111111111111111");
      fn();
      handler = null;
    }, options.time);
  };
}

let count = 0;
let container = document.getElementById("container");
let cancelBtn = document.getElementById("cancel");
function getUserAction(e) {
  container.innerHTML = ++count;
}
let setUserAction = debounce(getUserAction, {
  immediate: true,
  time: 300
});
container.addEventListener("mousemove", () => {
  setUserAction();
});
cancelBtn.addEventListener("click", () => {
  setUserAction.cancel();
});
